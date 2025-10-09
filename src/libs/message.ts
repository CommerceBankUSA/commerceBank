import redisClient from "./redis";

//Services
import { getUserPreviewById } from "../modules/user/user.service";

//Functions and Constants
const MESSAGE_EXPIRY_SECONDS = 7 * 24 * 60 * 60;

// Normalize the chat key (same for both users)
const getChatKey = (userA: string, userB: string): string => {
  const [id1, id2] = [userA, userB].sort();
  return `chat:${id1}:${id2}`;
};

//Save Messages
export const saveMessage = async ({
  id,
  sender,
  receiver,
  text,
  timestamp,
}: {
  id: string;
  sender: string;
  receiver: string;
  text: string;
  timestamp: number;
}) => {
  const messageKey = `msg:${id}`;
  const messageData = JSON.stringify({
    id,
    sender,
    receiver,
    text,
    timestamp,
  });

  // Save the message with expiry
  await redisClient.set(messageKey, messageData, {
    EX: MESSAGE_EXPIRY_SECONDS,
  });

  const chatKey = getChatKey(sender, receiver);

  // Add the message to the sorted set
  await redisClient.zAdd(chatKey, [{ score: timestamp, value: messageKey }]);

  // Track this conversation for both users
  await redisClient.sAdd(`userConversations:${sender}`, receiver);
  await redisClient.sAdd(`userConversations:${receiver}`, sender);

  // Track unread count for receiver
  await redisClient.incr(`unreadCount:${receiver}:${sender}`);
};

export const getAllConversations = async (userId: string, isAdmin: boolean) => {
  const userConversations = await redisClient.sMembers(
    `userConversations:${userId}`
  );

  const messagesGrouped: Record<string, any[]> = {};
  const unreadCounts: Record<string, number> = {};
  const userPreviews: Record<string, any> = {};

  for (const otherUserId of userConversations) {
    const chatKey = getChatKey(userId, otherUserId);

    const messagesWithScores = await redisClient.zRangeWithScores(
      chatKey,
      0,
      -1
    );

    const parsedMessages = [];

    for (const { value: messageKey, score } of messagesWithScores) {
      const raw = await redisClient.get(messageKey);
      if (!raw) continue;

      try {
        const message = JSON.parse(raw);
        parsedMessages.push({ ...message, timestamp: score });
      } catch (error) {
        console.error(`Failed to parse message in ${messageKey}:`, error);
      }
    }

    messagesGrouped[otherUserId] = parsedMessages;

    // Get unread count
    const unreadCountStr = await redisClient.get(
      `unreadCount:${userId}:${otherUserId}`
    );
    unreadCounts[otherUserId] = parseInt(unreadCountStr || "0", 10);

    // Fetch preview if admin
    if (isAdmin) {
      const preview = await getUserPreviewById(otherUserId);
      userPreviews[otherUserId] = preview;
    }
  }

  // Sort conversations by most recent message timestamp
  const sortedConversations = userConversations.sort((a, b) => {
    const aLast = messagesGrouped[a]?.at(-1)?.timestamp || 0;
    const bLast = messagesGrouped[b]?.at(-1)?.timestamp || 0;
    return bLast - aLast;
  });

  return sortedConversations.map((id) => ({
    userId: id,
    unreadCount: unreadCounts[id],
    messages: messagesGrouped[id],
    userPreview: isAdmin ? userPreviews[id] : undefined,
  }));
};

//Mark all messages as read
export const markAllMessages = async (userId: string, otherUserId: string) => {
  const unreadKey = `unread:${userId}:${otherUserId}`;
  await redisClient.del(unreadKey);
};
