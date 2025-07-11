import { createClient } from "redis";

const redisClient = createClient({
  username: "default",
  password: "BR3pzv3Sen90iUiklWff2y5RhvmuXa7C",
  socket: {
    host: "redis-18801.c83.us-east-1-2.ec2.redns.redis-cloud.com",
    port: 18801,
  },
});

redisClient.on("error", (err) => console.error("Redis Error:", err));

const connectRedis = async () => {
  await redisClient.connect();
};

connectRedis();

export default redisClient;
