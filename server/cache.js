const redis = require("redis");
const util = require("util");
const redisUrl = process.env.REDIS_URL || "redis://redis:6379";

const redisClient = redis.createClient({
  url: redisUrl,
  legacyMode: true,
});

const getAsync = util.promisify(redisClient.get).bind(redisClient);
const setexAsync = util.promisify(redisClient.setex).bind(redisClient);

(async () => {
  redisClient.connect();
})();

redisClient.on("connect", () => {
  console.log("Redis connected");
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

class CacheService {
  async get(key) {
    try {
      const cachedData = await getAsync(key);
      return cachedData ? JSON.parse(cachedData) : null;
    } catch (error) {
      return null;
    }
  }

  async set(key, data, ttlInSeconds) {
    try {
      await setexAsync(key, ttlInSeconds, JSON.stringify(data));
    } catch (error) {
      console.error("Error writing to cache:", error);
    }
  }
}

module.exports = {
  CacheService,
};
