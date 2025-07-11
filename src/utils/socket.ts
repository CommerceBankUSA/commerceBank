import { Server } from "socket.io";

//Services
import { createNotification } from "../modules/notifications/notifications.services";
import {
  updateOnlineStatus,
  updateUserSession,
} from "../modules/user/user.service";

//Utils
import { allowedOrigins } from "./cors";

import {
  saveMessage,
  getAllConversations,
  markAllMessages,
} from "../libs/message";
import { updateAdminStatus } from "../modules/admin/admin.service";

let io: Server;
const onlineUsers = new Map<string, string>();

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: (origin, cb) => {
        if (!origin || allowedOrigins.includes(origin)) {
          cb(null, origin);
        } else {
          cb(new Error("Not allowed by CORS"), false);
        }
      },
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Join room and track online
    socket.on("joinRoom", async (userId: string, isAdmin: boolean) => {
      if (userId) {
        socket.join(userId);
        onlineUsers.set(userId, socket.id);

        //If it is an admin, update status as true
        if (isAdmin) {
          await updateAdminStatus(userId);
        }
        await updateOnlineStatus(userId, true);
      }
    });

    // Send Message
    socket.on("sendMessage", async ({ from, to, text }) => {
      const id = `${Date.now()}-${from}`;
      await saveMessage({ id, sender: from, receiver: to, text });

      io.to(to).emit("newMessage", {
        id,
        from,
        text,
        timestamp: Date.now(),
        readBy: [],
      });

      io.to(from).emit("messageSent", {
        id,
        to,
        text,
        timestamp: Date.now(),
        readBy: [],
      });
    });

    // Typing
    socket.on("typing", ({ to, from, isTyping }) => {
      io.to(to).emit("typing", { from, isTyping });
    });

    //Get all Conversations
    socket.on("getAllConversations", async ({ userId, isAdmin }) => {
      const conversations = await getAllConversations(userId, isAdmin);
      socket.emit("userConversations", { conversations });
    });

    // Mark All Messages As Read
    socket.on("markAsRead", async ({ userId, otherUserId }) => {
      await markAllMessages(userId, otherUserId);

      const otherSocketId = onlineUsers.get(otherUserId);
      if (otherSocketId) {
        io.to(otherSocketId).emit("messagesRead", {
          readerId: userId,
          conversationWith: otherUserId,
        });
      }
    });

    // Disconnect Handler
    socket.on("disconnect", () => {
      const userId = [...onlineUsers.entries()].find(
        ([_, id]) => id === socket.id
      )?.[0];
      if (userId) {
        onlineUsers.delete(userId);
        updateUserSession(userId);
        io.emit("userOffline", { userId });
        console.log(`User ${userId} went offline`);
      }

      console.log("Socket disconnected:", socket.id);
    });
  });
};

//Function to emit and save a users notifications
export const emitAndSaveNotification = async ({
  user,
  type,
  subtype,
  title,
  message,
  data,
}: {
  user: string;
  type: string;
  subtype: string;
  title: string;
  message: string;
  data?: Record<string, any>;
}) => {
  const notification = await createNotification(user, {
    type,
    subtype,
    title,
    message,
    data,
  });

  if (io) {
    io.to(user).emit("notification", notification);
  }

  return notification;
};
