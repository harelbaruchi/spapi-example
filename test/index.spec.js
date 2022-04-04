import { AmzShipments, MarketplaceCountries } from "../dist";
const moment = require("moment");
const threeMonthsAgo = 1634554498000;
const today = Date.now();

describe("automated test to check calls from multiple users", () => {
  const amzShipments = new AmzShipments();
  test("should return marketplace shipmentList", async () => {
    expect.assertions(1);
    await expect(
      amzShipments.getShipmentList({
        credentials: { refreshToken: process.env.REFRESH_TOKEN2 },
        filters: { byDateRange: { start: threeMonthsAgo, end: today } },
        marketplaceCountry: MarketplaceCountries.US,
      })
    );
  });
});
