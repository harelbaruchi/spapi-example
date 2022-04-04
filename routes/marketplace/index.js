const router = require("express").Router();
const { json } = require("body-parser");
const logic = require("./logic");

/**
 * this is the /marketplace route any calls to the api via marketplace should get redirected
 * into this route.
 */

/**
 * 'GET =>/marketplace/getMarketplace' returns the marketplace participations of the account
 * associated with the given refresh_token.
 */

try {
  router.get("/getMarketplace", async (req, res) => {
    const mp = await logic.getMarketplace();
    res.json(200);
    console.log(mp);
  });
} catch (error) {
  console.log(error);
}

/**
 * 'GET =>/marketplace/endpoints' returns the api endpoints for use in a given api
 * version
 */

try {
  router.get("/endpoints", async (req, res) => {
    const mp = await logic.getEndpoints();
    res.json(200);
    console.log(mp);
  });
} catch (error) {
  console.log(error);
}
/**
 * create seller report
 */

try {
  router.post("/createSellerReport", async (req, res) => {
    const data = await logic.createSellerPerformance();
    res.json(200);
    console.log(data);
  });
} catch (error) {
  console.log(error);
}

module.exports = router;
