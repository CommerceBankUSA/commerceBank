import { Server } from "socket.io";

//Services
import {
  createNotification,
  getUserNotifications,
} from "../modules/notifications/notifications.services";
import {
  updateOnlineStatus,
  updateUser,
  updateUserSession,
} from "../modules/user/user.service";
import { updateAdminStatus } from "../modules/admin/admin.service";
import {
  saveMessage,
  getAllConversations,
  markAllMessages,
} from "../libs/message";

//Utils, Libs and Configs
import { allowedOrigins } from "./cors";
import { sendEmail } from "../libs/mailer";
import { SMTP_FROM_EMAIL } from "../config";

//Emails
import suspensionEmail from "../emails/suspension";
import restoredEmail from "../emails/unsuspended";

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

        const userNotifications = await getUserNotifications(userId);
        io.to(userId).emit("allNotifications", userNotifications);

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
      const timestamp = Date.now();
      await saveMessage({ id, sender: from, receiver: to, text, timestamp });

      io.to(to).emit("newMessage", {
        id,
        from,
        text,
        timestamp,
      });

      io.to(from).emit("messageSent", {
        id,
        to,
        text,
        timestamp,
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

    //Logout a user
    socket.on("logoutUser", async (userId) => {
      await updateUserSession(userId);
      io.to(userId).emit("offline");
    });

    //Suspend a user
    socket.on("suspendUser", async (userId, email, suspended) => {
      const data = { email, isSuspended: suspended };
      const updatedUser = await updateUser(data);

      if (updatedUser !== null) {
        const template =
          suspended === true
            ? suspensionEmail({ name: updatedUser.fullName }).html
            : restoredEmail({ name: updatedUser.fullName }).html;

        await sendEmail({
          from: SMTP_FROM_EMAIL,
          to: updatedUser.email,
          subject:
            suspended === true
              ? suspensionEmail({ name: updatedUser.fullName }).subject
              : restoredEmail({ name: updatedUser.fullName }).subject,
          html: template,
        });
      }

      io.to(userId).emit("suspended");
    });

    // Disconnect Handler
    socket.on("disconnect", async () => {
      const userId = [...onlineUsers.entries()].find(
        ([_, id]) => id === socket.id
      )?.[0];
      if (userId) {
        onlineUsers.delete(userId);
        await updateUserSession(userId);
        await updateOnlineStatus(userId, false);
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
