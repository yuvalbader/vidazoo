const axios = require("axios");
const { CacheService } = require("../cache");
const { AdsService } = require("../services/adsService");

const cacheService = new CacheService();
const adsService = new AdsService(cacheService, axios);

const getAds = async (req, res) => {
  const { domain } = req.query;

  try {
    if (!domain) {
      return res.status(400).json({ error: "Domain parameter is missing" });
    }

    const result = await adsService.getAds(domain);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports = {
  getAds,
};
