// cache.js
const redis = require("async-redis");
const redisHost = process.env.REDIS_HOST || "127.0.0.1";
const redisClient = redis.createClient({
  url: "redis://redis:6379",
  legacyMode: true,
});
// Handle Redis client errors
redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

class CacheService {
  async get(key) {
    try {
      const cachedData = await redisClient.get(key);
      return cachedData ? JSON.parse(cachedData) : null;
    } catch (error) {
      console.error("Error reading from cache:", error);
      return null;
    }
  }

  async set(key, data, ttlInSeconds) {
    try {
      await redisClient.setex(key, ttlInSeconds, JSON.stringify(data));
    } catch (error) {
      console.error("Error writing to cache:", error);
    }
  }
}

module.exports = {
  CacheService,
};
