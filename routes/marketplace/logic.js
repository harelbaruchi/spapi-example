const SellingPartnerAPI = require("amazon-sp-api");
const SellingPartner = require("amazon-sp-api/lib/SellingPartner");

/**
 *
 * @returns the marketplace participations
 */

async function getMarketplace() {
  try {
    let sellingPartner = new SellingPartnerAPI({
      region: "na", // The region to use for the SP-API endpoints ("eu", "na" or "fe")
      refresh_token: process.env.REFRESH_TOKEN, // The refresh token of your app user
    });
    let res = await sellingPartner.callAPI({
      operation: "getMarketplaceParticipations",
      endpoint: "sellers",
    });
    return res;
  } catch (e) {
    console.log(e);
  }
}

async function createSellerPerformance() {
  try {
    let sellingPartner = new SellingPartnerAPI({
      region: "na",
      refresh_token: process.env.REFRESH_TOKEN,
    });

    let res = await sellingPartner.callAPI({
      operation: "createReport",
      endpoint: "reports",
      body: {
        reportType: "GET_V2_SELLER_PERFORMANCE_REPORT",
        marketplaceIds: ["ATVPDKIKX0DER"],
      },
      options: {
        version: "2021-06-30",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

/**
 *
 * @returns the report that was created via api
 */

async function getSellerPerformance() {
  try {
    let sellingPartner = new SellingPartnerAPI({
      region: "na",
      refresh_token: process.env.REFRESH_TOKEN,
    });
    let res = await sellingPartner.callAPI({
      operation: "getReports",
      endpoint: "reports",
      query: {
        MarketplaceId: "ATVPDKIKX0DER",
        reportTypes: ["GET_V2_SELLER_PERFORMANCE_REPORT"],
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

/**
 *
 * @returns the api endpoints we can use
 */
async function getEndpoints() {
  try {
    let sellingPartner = new SellingPartnerAPI({
      region: "na", // The region to use for the SP-API endpoints ("eu", "na" or "fe")
      refresh_token: process.env.REFRESH_TOKEN, // The refresh token of your app user
    });
    let res = await sellingPartner.endpoints;
    return res;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getMarketplace,
  getEndpoints,
  createSellerPerformance,
  getSellerPerformance,
};
