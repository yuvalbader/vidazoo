const { AdsService } = require("./adsService");
const axiosDriver = require("./test_support/axiosTestSupport");
const cacheDriver = require("./test_support/cacheTestSupport");

const fs = require("fs");
const path = require("path");

const adsExample = fs.readFileSync(
  path.join(__dirname, "test_support", "ads_example.txt"),
  "utf-8"
);

describe("AdsService", () => {
  let adsService;
  let mockAds = [
    { domain: "test1.com", count: 1 },
    { domain: "test2.com", count: 2 },
  ];

  beforeAll(() => {
    adsService = new AdsService(cacheDriver.mockCache, axiosDriver.mockAxios);
  });

  afterEach(() => {
    axiosDriver.reset();
    cacheDriver.reset();
  });

  describe("getAds", () => {
    test("should return ads from cache if available", async () => {
      cacheDriver.givenValueForCacheKey("example.com", {
        advertisers: mockAds,
        fromCache: true,
        parseTime: null,
      });

      const result = await adsService.getAds("example.com");

      expect(result.advertisers).toEqual(expect.arrayContaining(mockAds));
      expect(axiosDriver.mockAxios.get).not.toHaveBeenCalled();
    });

    test("should return ads from axios if not in cache", async () => {
      cacheDriver.givenEmptyCache();
      axiosDriver.givenAdsForDomain("https://example.com/ads.txt", adsExample);

      const result = await adsService.getAds("example.com");

      expect(result.advertisers).toEqual(expect.arrayContaining(mockAds));
      expect(cacheDriver.mockCache.set).toHaveBeenCalledTimes(1);
      expect(cacheDriver.mockCache.set).toHaveBeenCalledWith(
        "example.com",
        {
          domain: "example.com",
          parseErrors: expect.any(Number),
          advertisers: expect.arrayContaining(mockAds),
          totalAdvertisers: expect.any(Number),
          totalAds: expect.any(Number),
          parseTime: expect.any(Number),
        },
        3600
      );
    });
  });
});
