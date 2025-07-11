import redisClient from "./redis";

//Services
import { getUserPreviewById } from "../modules/user/user.service";

const MESSAGE_EXPIRY_SECONDS = 7 * 24 * 60 * 60;

//Save Messages
export const saveMessage = async ({
  id,
  sender,
  receiver,
  text,
}: {
  id: string;
  sender: string;
  receiver: string;
  text: string;
}) => {
  const messageKey = `msg:${id}`;
  const messageData = JSON.stringify({
    id,
    sender,
    receiver,
    text,
    timestamp: Date.now(),
  });

  // Save message with expiry
  await redisClient.set(messageKey, messageData, {
    EX: MESSAGE_EXPIRY_SECONDS,
  });

  // Save to chat thread
  const senderThread = `chat:${sender}:${receiver}`;
  const receiverThread = `chat:${receiver}:${sender}`;

  const timestamp = Date.now();
  await redisClient.zAdd(senderThread, [
    { score: timestamp, value: messageKey },
  ]);
  await redisClient.zAdd(receiverThread, [
    { score: timestamp, value: messageKey },
  ]);

  // Mark as unread for receiver
  const unreadKey = `unread:${receiver}:${sender}`;
  await redisClient.sAdd(unreadKey, messageKey);
};

//Get all messages
export const getAllConversations = async (userId: string, isAdmin: boolean) => {
  const userConversations = new Set<string>();
  const messagesGrouped: Record<string, any[]> = {};
  const unreadCounts: Record<string, number> = {};
  const userPreviews: Record<string, any> = {};

  const keys = await redisClient.keys(`chat:${userId}:*`);

  for (const key of keys) {
    const parts = key.split(":");
    const otherUserId = parts[2];
    userConversations.add(otherUserId);

    const messagesWithScores = await redisClient.zRangeWithScores(key, 0, -1);
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

    // Count unread messages
    const unreadKey = `unread:${userId}:${otherUserId}`;
    const unreadCount = await redisClient.sCard(unreadKey);
    unreadCounts[otherUserId] = unreadCount;

    // If admin, get preview
    if (isAdmin) {
      const preview = await getUserPreviewById(otherUserId);
      userPreviews[otherUserId] = preview;
    }
  }

  // Sort conversations by last message timestamp
  const sortedConversations = Array.from(userConversations).sort((a, b) => {
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
