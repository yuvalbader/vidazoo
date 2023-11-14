const cache = require("../cache");
const adsService = require("../services/adsService");

const cacheMiddleware = async (req, res, next) => {
  const { domain } = req.query;

  try {
    if (!domain) {
      throw new Error("Domain parameter is missing");
    }

    // Check if data is in the cache
    const cachedData = await cache.getFromCache(domain);

    if (cachedData !== null) {
      console.log(`Serving ${domain} from Cache`);
      return res.json(cachedData);
    }

    console.log(`Serving ${domain} from API`);

    const result = await adsService.getAds(domain);

    // Cache the result for 1 hour (3600 seconds)
    await cache.setToCache(domain, result, 3600);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || "Bad Request" });
  }
};

module.exports = cacheMiddleware;
