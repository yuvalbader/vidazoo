class AdsService {
  constructor(cache, axios) {
    this.cache = cache;
    this.axios = axios;
    this.redisTTL = 3600;
  }

  async getAds(domain) {
    try {
      const cachedData = await this.cache.get(domain);

      if (cachedData !== null) {
        console.log(`Serving ${domain} from Cache`);
        const { parseTime, ...cachedWithoutTime } = cachedData;
        return { ...cachedWithoutTime, fromCache: true, parseTime: null };
      }

      console.log(`Serving ${domain} from API`);

      const startTime = new Date();

      const result = await this.getAdsFromAPI(domain);

      const endTime = new Date();
      const parseTime = endTime - startTime;

      await this.cache.set(domain, { ...result, parseTime }, this.redisTTL);
      return { ...result, fromCache: false, time: parseTime };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAdsFromAPI(domain) {
    try {
      const adsTxtResponse = await this.axios.get(`https://${domain}/ads.txt`);

      return this.parseAdsTxt(adsTxtResponse.data, domain);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  parseAdsTxt(adsTxtContent, domain) {
    const lines = adsTxtContent.split(/\r\n|\n|\r/);
    const advertisers = [];
    let parseErrors = 0;

    lines.forEach((line) => {
      if (/^\s*#/.test(line) || /^\s*$/.test(line)) {
        return;
      }

      const [advertiser, ...otherFields] = line
        .split(",")
        .map((field) => field.trim().toLowerCase());

      if (
        otherFields.length < 2 ||
        !/^(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,6}$/.test(
          advertiser
        ) ||
        otherFields.some((field) => field === "")
      ) {
        parseErrors++;
        return;
      }

      if (advertisers[advertiser]) {
        advertisers[advertiser] += 1;
      } else {
        advertisers[advertiser] = 1;
      }
    });

    const advertisersArray = Object.keys(advertisers).map((advertiser) => {
      return { domain: advertiser, count: advertisers[advertiser] };
    });

    const totalAdvertisers = advertisersArray.length;
    const totalAds = advertisersArray.reduce(
      (total, advertiser) => total + advertiser.count,
      0
    );

    const response = {
      domain,
      parseErrors,
      advertisers: advertisersArray,
      totalAdvertisers,
      totalAds,
    };

    return response;
  }
}

module.exports = {
  AdsService,
};
