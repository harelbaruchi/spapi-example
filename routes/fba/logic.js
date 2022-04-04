const SellingPartnerAPI = require("amazon-sp-api");
const { AmzShipments, MarketplaceCountries } = require("../../dist");
const moment = require("moment");
const { json } = require("express/lib/response");
let shipmentsData = [];
let sku = "";
let shipmentInfoResult = [];
let deliverables = [];

const threeMonthsAgo = 1634554498000;
const today = Date.now();
const oneYearAgo = moment().subtract(12, "months");
const twoYearsAgo = moment().subtract(24, "months");

const shipmentListParams = {
  credentials: {
    refreshToken: process.env.REFRESH_TOKEN,
  },
  marketplaceCountry: MarketplaceCountries.US,
  filters: {
    byDateRange: {
      start: threeMonthsAgo,
      end: today,
    },
  },
};

const getLabelsParams = {
  credentials: {
    refreshToken: process.env.REFRESH_TOKEN,
  },
  marketplaceCountry: MarketplaceCountries.US,
  shipmentId: "FBA16JQZ012R",
  pageType: "PackageLabel_A4_4",
  labelType: "BARCODE_2D",
  pageSize: 3,
  pageStartIndex: 0,
};

const marketplaceSku = "B08DF248LD";

const marketplaceSkus = [
  "B08DF248LD",
  "B01HTIET3Y",
  "B08SC4K9ZK",
  "B08N4268HT",
  "B01G9AYG0O",
  "B01LXKKVPK",
  "B075FD3GMD",
  "B00YAZMZ0E",
  "B07HJFXHKV",
  "B07R8VW2CT",
  "B01K07N018",
  "B072R6CLRC",
  "B08QH3SGTC",
  "B081VXCJDX",
  "B08621GBMF",
  "B07NZ7XL1B",
  "B083XQ28WV",
  "B096NQ527R",
  "B09JXZLRWK",
  "B08FJ31QPD",
  "B08PDYM9FB",
  "B088NLRVG2",
  "B0979RD6NM",
  "B07F6MXJ9X",
  "B08Z88VWKC",
];
const getProductsSettings = {
  credentials: {
    refreshToken: process.env.REFRESH_TOKEN,
  },
  marketplaceCountry: MarketplaceCountries.US,
  marketplaceSkus,
};

const getProductSettings = {
  credentials: {
    refreshToken: process.env.REFRESH_TOKEN,
    sellingPartnerAppClientId: process.env.SELLING_PARTNER_APP_CLIENT_ID,
    sellingPartnerAppClientSecret:
      process.env.SELLING_PARTNER_APP_CLIENT_SECRET,
    awsAccessKeyId: process.env.AWS_SELLING_PARTNER_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SELLING_PARTNER_SECRET_ACCESS_KEY,
    awsSellingPartnerRole: process.env.AWS_SELLING_PARTNER_ROLE_ARN,
  },
  marketplaceCountry: [MarketplaceCountries.US],
  marketplaceSku: "B07X3FQGGL",
  includedData: ["summaries", "images"],
};

const getProductAttributesSettings = {
  credentials: {
    refreshToken: process.env.REFRESH_TOKEN,
    sellingPartnerAppClientId: process.env.SELLING_PARTNER_APP_CLIENT_ID,
    sellingPartnerAppClientSecret:
      process.env.SELLING_PARTNER_APP_CLIENT_SECRET,
    awsAccessKeyId: process.env.AWS_SELLING_PARTNER_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SELLING_PARTNER_SECRET_ACCESS_KEY,
    awsSellingPartnerRole: process.env.AWS_SELLING_PARTNER_ROLE_ARN,
  },
  marketplaceCountry: MarketplaceCountries.US,
  marketplaceSku: "B07X3FQGGL",
};

//parameters for getShipmentProducts
const getShipmentProductsSettings = {
  credentials: {
    refreshToken: process.env.REFRESH_TOKEN,
    sellingPartnerAppClientId: process.env.SELLING_PARTNER_APP_CLIENT_ID,
    sellingPartnerAppClientSecret:
      process.env.SELLING_PARTNER_APP_CLIENT_SECRET,
    awsAccessKeyId: process.env.AWS_SELLING_PARTNER_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SELLING_PARTNER_SECRET_ACCESS_KEY,
    awsSellingPartnerRole: process.env.AWS_SELLING_PARTNER_ROLE_ARN,
  },
  marketplaceCountry: MarketplaceCountries.US,
  shipmentId: "FBA16JQZ012R",
};

async function getShipmentProducts() {
  const shipmentService = new AmzShipments();
  let res = await shipmentService.getShipmentProducts(
    getShipmentProductsSettings
  );
  return res;
}

async function getProductAttributes() {
  const shipmentService = new AmzShipments();
  let res = await shipmentService.getProductAttributes(
    getProductAttributesSettings
  );
  return res;
}

/**
 *
 * @returns
 */
async function getItemTitle(id) {
  const shipmentService = new AmzShipments(settings);
  let response = await shipmentService.getItemName(id);
  return response;
}

/**
 *
 * @returns the list of shipments that the customer has on his shipments list
 */
async function getShipmentList() {
  console.log(parseInt(moment().format()));
  const shipmentService = new AmzShipments();
  let result = await shipmentService.getShipmentList(shipmentListParams);
  return result;
}

/**
 *
 * @param {*} id
 * @returns the downloading URl for the marketplace shipment labels
 */

async function getShipmentLabels() {
  const shipmentService = new AmzShipments();
  let result = await shipmentService.getLabels(getLabelsParams);
  return result;
}
async function getDeliverablesList(id) {
  const shipmentService = new AmzShipments(settings);
  let result = await shipmentService.getDeliverables(id);
  return result;
}
/**
 * getShipment() returns the shipment properties neede for a quote , other then that it seems
 */
const marketplaceId = "ATVPDKIKX0DER";

async function getShipment(id) {
  const shipmentService = new AmzShipments(settings);
  const getShipmentParams = {
    shipmentId: id,
    dateRange: {
      start: threeMonthsAgo,
      end: today,
    },
  };
  let result = await shipmentService.getShipment(getShipmentParams);
  return result;
}

/**
 *
 * @returns shipment Labels By shipmentId
 */

async function getLabels(shipmentId) {
  let sellingPartner = new SellingPartnerAPI({
    region: "na",
    refresh_token: process.env.REFRESH_TOKEN,
  });

  const res = sellingPartner.callAPI({
    operation: "fulfillmentInbound.getLabels",
    path: { shipmentId },
    query: {
      PageType: "PackageLabel_A4_4",
      LabelType: "BARCODE_2D",
      PageSize: 5,
      PageStartIndex: 1,
    },
  });

  return res;
}
/**
 *
 * returns in <array> object the fba shipments in the accounts shipping queue for the last 3 months
 * VERY IMPORTANT!!: for testing purposes I set the shipments status query to 'CLOSED'
 * moving to production this status should be set on 'WORKING'
 */

async function getShipments() {
  let shipmentList = [];
  try {
    let sellingPartner = new SellingPartnerAPI({
      region: "na",
      refresh_token: process.env.REFRESH_TOKEN,
    });
    let oneYearAgo = moment().subtract(12, "months");
    let res = await sellingPartner.callAPI({
      operation: "fulfillmentInbound.getShipments",

      query: {
        MarketplaceId: "ATVPDKIKX0DER",
        QueryType: "DATE_RANGE",
        //giving the last 3 months as a date range in ISO format
        LastUpdatedAfter: `${oneYearAgo.format()}`,
        LastUpdatedBefore: `${moment().format()}`,
        ShipmentStatusList: [
          "WORKING",
          "SHIPPED",
          "RECEIVING",
          "CLOSED",
          "IN_TRANSIT",
          "DELIVERED",
        ],
        NextToken:
          "AAAAAAAAAABFbY6aB/GFu45BvuUbI+inrQEAAAAAAACpgWi5DaR0QdxbTbmD48DwEloTQsDi8hi6pfLmOhp+YTk7ZFyzS4uBOm3qGEZsOz8OM+noGyu5p+SpleM65xU9b4YhysqRGKOMesFiWraRlzu3Myq+D/qTPwVJLdt11HtYL/LT7Fc2a/47cdNc62DnDz5SmshbxfblWSCD7ko54+NwO2QotkcGLlMlhkIZ7cYkCo9NznPt4chcaZp+MD0qO0qofGXOygyXirjbkDoFq/e28z26wTvNC+3rDVcOYtXcrb8el9vMq/rFPpUVJpXD0Ou2HJU3iq86JdTOV8eIxOYgRpouQ+nzyAyyr2UWr4sBGIoUvYzooLRlC6uWZelc/NMH+3Sy+eE1xYqMDsb2ObnySQphtv1StSrpHGwXacbFtJWpqoPejhFf3vXIrh7JA9LatI4HIFtimv1L67EVNCtyU4oFxLtQkWTBVQdBBgavGmtCXNKyaNFJOAaaviVeyOyeAP7Z1SpY3MMWCPFQ/mF+HyngVJvKyrSixAu3KBB0IfKXj/RvL6at1IUtlnIV7cnjuyVt6G23rS37b44ylkEpIuZUG2Mor4dBtpI=",
      },
    });
    return res;
  } catch (e) {
    console.log(e);
  }
}
/**
 *
 * @param {*} shipmentIds
 * @returns the specific shipments accurding to Input
 */
async function getShipmentById(shipmentIds) {
  try {
    let sellingPartner = new SellingPartnerAPI({
      region: "na",
      refresh_token: process.env.REFRESH_TOKEN,
    });
    let res = await sellingPartner.callAPI({
      operation: "fulfillmentInbound.getShipments",
      query: {
        MarketplaceId: "ATVPDKIKX0DER",
        QueryType: "SHIPMENT",
        //giving the last 3 months as a date range in ISO format
        ShipmentIdList: shipmentIds,
      },
    });
    return res.ShipmentData; //returns an array of shipments from the shipping queue
  } catch (e) {
    console.log(e);
  }
}

function getShipFromAdress(id) {
  const result = shipmentsData.find((item) => item.ShipmentId === id);
  const address = result.ShipFromAddress;
  return address;
}

/**
 *
 * @param {fbaShipmentId} id
 * @returns a string that represents the fba fulfillment center
 */
function getShipToAddress(id) {
  const result = shipmentsData.find((item) => item.ShipmentId === id);
  const address = result.DestinationFulfillmentCenterId;
  return address;
}

async function getShipmentItemsByShipmentId(id) {
  try {
    let sellingPartner = new SellingPartnerAPI({
      region: "na",
      refresh_token: process.env.REFRESH_TOKEN,
    });
    let res = await sellingPartner.callAPI({
      operation: "fulfillmentInbound.getShipmentItemsByShipmentId",
      path: { shipmentId: `${id}` },
      query: {
        MarketplaceId: "ATVPDKIKX0DER",
        NextToken:
          "AAAAAAAAAABVjUKOt5A6pmRVYHuSO6oOUwEAAAAAAAC6quAaGB16/xgvAK+lFPVK7NLx3WCzp7qQfwr3n6RtDd3kFrtFN0EQFew3bqze1otmXJ3Prcuv/7pvkQBaFrc/m9wANC040j4AUmhzxYYf/jfVZsn6aWjpXAPOHTClZKkEnP+DRvlo0GjuvB6EYGa9Ffipt20JuTOWCo+5ZRc8x7Pz6s+Np8XH2fj6CuSE24n7KA5zBm3lOxrGFlWrGiHiEs8PaaWmFIrgnM//9BZS3dpel9N13wj1tfya2GKiR/k8vOxyVKFe83c341N8811bmEWXaXHErXoNyugoVRv0NJEfwXDye2DvYXivBmyT2JJ2lNXMkr0+OUL/DO477CPLPJ96OtSCrtutt7I68QEzcI6ETobY5aMvp9JVUMhFYKpt4WvxBKjOxdx2X9GF23nhkI/+VWKGZv0Qr69f8VrkiLZ4cSmZCrFTKGP9MIDCysLvaSI=",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

/**
 *
 * @param {*} Id
 * @returns THE shipment info based on the shipmentId that passed as an input.
 */

async function getShipmentInfoById(Id) {
  try {
    let sellingPartner = new SellingPartnerAPI({
      region: "na",
      refresh_token: process.env.REFRESH_TOKEN,
    });
    let res = await sellingPartner.callAPI({
      operation: "getShipmentItemsByShipmentId",
      endpoint: "fulfillmentInbound",
      path: { shipmentId: `${Id}` },
      query: {
        MarketplaceId: "ATVPDKIKX0DER",
      },
    });
    //shipmentsData must hold shipments for this to work
    shipmentsData = await getShipments();
    for (i = 0; i < res.ItemData.length; i++) {
      let result = {
        shipmentId: res.ItemData[i].ShipmentId,
        sellerSKU: res.ItemData[i].SellerSKU,
        fulfillmentNetworkSKU: res.ItemData[i].FulfillmentNetworkSKU,
        itemName: await searchCatalogItems(
          res.ItemData[i].FulfillmentNetworkSKU
        ),
        shipfromAdress: getShipFromAdress(res.ItemData[i].ShipmentId),
        fbaCode: getShipToAddress(res.ItemData[i].ShipmentId),
        quantityShipped: res.ItemData[i].QuantityShipped,
        deliverables: await getDeliverables(res.ItemData[i].ShipmentId),
      };
      shipmentInfoResult.push(result);
    }
    return shipmentInfoResult;
  } catch (error) {
    console.log(error);
  }
}
//test getProduct of the class
async function getProduct() {
  const shipmentService = new AmzShipments();
  let result = await shipmentService.getProduct(getProductSettings);
  return result;
}

//test getProducts method of the class
async function getProducts() {
  const shipmentService = new AmzShipments();
  let result = shipmentService.getProducts(getProductsSettings);
  return result;
}

async function searchCatalogItems() {
  let sellingPartner = new SellingPartnerAPI({
    region: "na",
    refresh_token: process.env.REFRESH_TOKEN,
  });
  let result = await sellingPartner.callAPI({
    operation: "catalogItems.searchCatalogItems",
    options: { version: "2020-12-01" },
    query: {
      marketplaceIds: ["ATVPDKIKX0DER"],
      keywords: [
        "B08DF248LD",
        "B01HTIET3Y",
        "B08SC4K9ZK",
        "B08N4268HT",
        "B01G9AYG0O",
        "B01LXKKVPK",
        "B075FD3GMD",
        "B00YAZMZ0E",
        "B07HJFXHKV",
        "B07R8VW2CT",
        "B01K07N018",
        "B072R6CLRC",
        "B08QH3SGTC",
        "B081VXCJDX",
        "B08621GBMF",
        "B07NZ7XL1B",
        "B083XQ28WV",
        "B096NQ527R",
        "B09JXZLRWK",
        "B08FJ31QPD",
        "B08PDYM9FB",
        "B088NLRVG2",
        "B0979RD6NM",
        "B07F6MXJ9X",
        "B08Z88VWKC",
      ],
      includedData: ["summaries"],
      pageSize: 20,
    },
  });
  console.log(result, "result of get ItemName");
  return result;
}

async function getCatalogItem() {
  let sellingPartner = new SellingPartnerAPI({
    region: "na",
    refresh_token: process.env.REFRESH_TOKEN,
  });

  let result = await sellingPartner.callAPI({
    operation: "catalogItems.getCatalogItem",
    path: { asin: "B08DF248LD" },
    options: {
      version: "2020-12-01",
    },
    query: {
      marketplaceIds: ["ATVPDKIKX0DER"],
      includedData: [
        "attributes",
        "summaries",
        "variations",
        "productTypes",
        "identifiers",
        "salesRanks",
        "images",
      ],
    },
  });
  console.log(JSON.stringify(result), "result of get ItemName");
  return result;
}

/**
 * returning the deliverables info for a specified shipment Id.
 *
 */

async function getDeliverables(Id) {
  try {
    let sellingPartner = new SellingPartnerAPI({
      region: "na",
      refresh_token: process.env.REFRESH_TOKEN,
    });
    let res = await sellingPartner.callAPI({
      operation: "getTransportDetails",
      endpoint: "fulfillmentInbound",
      path: { shipmentId: `${Id}` },
    });
    console.log(JSON.stringify(res));
    let shipmentData = res.TransportContent.TransportDetails,
      header = res.TransportContent.TransportHeader;
    if (header.ShipmentType == "SP" && header.IsPartnered == true) {
      deliverables = shipmentData.PartneredSmallParcelData.PackageList;
    } else if (header.ShipmentType == "LTL" && header.IsPartnered == true) {
      deliverables = shipmentData.PartneredLtlData.PackageList;
    } else if (header.ShipmentType == "SP" && header.IsPartnered == false) {
      deliverables = shipmentData.NonPartneredSmallParcelData.PackageList;
    } else if (header.ShipmentType == "LTL" && header.IsPartnered == false) {
      deliverables = shipmentData.NonPartneredLtlData.PackageList;
    }
    let count = 1;
    for (i = 0; i < deliverables.length; i++) {
      count = count + 1;
    }
    const result = {
      dimensions: deliverables[0].Dimensions,
      weight: deliverables[0].Weight,
      Count: count,
    };
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function getShipmentInfo(Id) {
  try {
    let sellingPartner = new SellingPartnerAPI({
      region: "na",
      refresh_token: process.env.REFRESH_TOKEN,
    });
    let res = await sellingPartner.callAPI({
      operation: "getShipmentItemsByShipmentId",
      endpoint: "fulfillmentInbound",
      query: { MarketplaceId: "ATVPDKIKX0DER" },
      path: { shipmentId: `${Id}` },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

async function getShipmentItems() {
  try {
    let sellingPartner = new SellingPartnerAPI({
      region: "na",
      refresh_token: settings,
    });
    const res = await sellingPartner.callAPI({
      operation: "getShipmentItems",
      endpoint: "fulfillmentInbound",
      query: {
        MarketplaceId: "ATVPDKIKX0DER",
        QueryType: "DATE_RANGE",
        //giving the last 3 months as a date range in ISO format
        LastUpdatedAfter: `${twoYearsAgo.format()}`,
        LastUpdatedBefore: `${moment().format()}`,
        ShipmentStatusList: [
          "WORKING",
          "SHIPPED",
          "RECEIVING",
          "CLOSED",
          "IN_TRANSIT",
          "DELIVERED",
        ],
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

async function getAccount() {
  try {
    let sellingPartner = new SellingPartnerAPI({
      region: "na",
      refresh_token: process.env.REFRESH_TOKEN,
    });

    let res = await sellingPartner.callAPI({
      operation: "shipping.getAccount",
      query: { marketplaceIds: [marketplaceId] },
    });
    if (res.errors) {
      return res.errors;
    }
    return res;
  } catch (error) {
    console.log(error);
  }
}

// LastUpdatedAfter: '2021-09-23T08:21:51Z',
// LastUpdatedBefore: '2021-11-19T00:00:00Z',

module.exports = {
  getShipmentById,
  getProductAttributes,
  getProducts,
  getShipments,
  getDeliverables,
  getShipmentInfoById,
  searchCatalogItems,
  getShipmentList,
  getShipment,
  getShipmentItemsByShipmentId,
  getShipmentInfo,
  getDeliverablesList,
  getItemTitle,
  getShipmentItems,
  getShipmentLabels,
  getLabels,
  getAccount,
  getCatalogItem,
  getProduct,
  getShipmentProducts,
};
