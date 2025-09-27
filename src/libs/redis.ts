import { createClient } from "redis";

const redisClient = createClient({
  username: "default",
  password: "UUdxdQConQmP7ibLzbjQHFoIETUF5QZ0",
  socket: {
    host: "redis-14701.c15.us-east-1-4.ec2.redns.redis-cloud.com",
    port: 14701,
  },
});

redisClient.on("error", (err) => console.error("Redis Error:", err));

const connectRedis = async () => {
  await redisClient.connect();
};

connectRedis();

export default redisClient;
