const router = require("express").Router();
const { json } = require("body-parser");
const logic = require("./logic");

try {
  router.get("/getItemTitle/:asin", async (req, res) => {
    const title = await logic.getItemTitle(req.params.asin);
    res.json(200);
    console.log(title);
  });
} catch (error) {
  console.log(error);
}
/**
 * returns the deliverables using the AmzShipments service
 */
try {
  router.get("/getDeliverablesList/:id", async (req, res) => {
    const deliverables = await logic.getDeliverablesList(req.params.id);
    res.json(200);
    console.log(deliverables);
  });
} catch (error) {
  console.log(error);
}
/**
 * returns all the info needed for a quote for a specific fba shipment Id
 * using the AmzShipments service built locally
 */
try {
  router.get("/getShipment/:id", async (req, res) => {
    const shipment = await logic.getShipment(req.params.id);
    res.json(200);
    console.log(shipment);
  });
} catch (error) {
  console.log(error);
}

/**
 * returns the shipments using the AmzShipments service built locally ,
 */

try {
  router.get("/getShipmentList", async (req, res) => {
    const shipmentList = await logic.getShipmentList();
    res.json(200);
    console.log(shipmentList);
  });
} catch (error) {
  console.log(error);
}
/**
 * returns the shipments for a given account
 */
try {
  router.get("/getShipments", async (req, res) => {
    const shipments = await logic.getShipments();
    res.json(shipments);
    console.log(shipments);
  });
} catch (error) {
  console.log(error);
}

try {
  router.get("/getShipments/:id", async (req, res) => {
    const shipments = await logic.getShipmentById(req.params.id);
    res.json(200);
    console.log(shipments);
  });
} catch (error) {
  console.log(error);
}

/**
 * AmzShipments.getLabels method
 */

try {
  router.get("/getLabels/", async (req, res) => {
    const labels = await logic.getShipmentLabels();
    res.json(200);
    console.log(labels);
  });
} catch (error) {
  console.log(error);
}

/**
 *
 */
try {
  router.get("/getShippingLabels/:id", async (req, res) => {
    const labels = await logic.getLabels(req.params.id);
    res.json(200);
    console.log(labels);
  });
} catch (error) {
  console.log(error);
}

/**
 * returns the deliverables for a given shipment Id.
 *
 */

try {
  router.get("/getDeliverables/:id", async (req, res) => {
    console.log(req.params);
    const deliverables = await logic.getDeliverables(req.params.id);
    res.json(200);
    console.log(deliverables);
  });
} catch (error) {
  console.log(error);
}

/**
 * returns the shipment name, Asin
 */
try {
  router.get("/getShipmentInfo/:id", async (req, res) => {
    const shipmentInfo = await logic.getShipmentInfo(req.params.id);
    res.json(200);
    console.log(shipmentInfo);
  });
} catch (error) {
  console.log(error);
}

try {
  router.get("/getShipmentItemsByShipmentId/:id", async (req, res) => {
    const shipmentInfo = await logic.getShipmentItemsByShipmentId(
      req.params.id
    );
    res.json(shipmentInfo);
    console.log(shipmentInfo);
  });
} catch (error) {
  console.log(error);
}

try {
  router.get("/productData", async (req, res) => {
    const productData = await logic.getItemName();
    res.json(200);
    console.log(productData);
  });
} catch (error) {
  console.log(error);
}

try {
  router.get("/getShipmentItems", async (req, res) => {
    const data = await logic.getShipmentItems();
    res.json(200);
    console.log(data);
  });
} catch (error) {
  console.log(error);
}

try {
  router.get("/getAccount", async (req, res) => {
    const data = await logic.getAccount();
    res.json(data);
    console.log(JSON.stringify(data));
  });
} catch (error) {
  console.log(error);
}

try {
  router.get("/getCatalogItem", async (req, res) => {
    const data = await logic.getCatalogItem();
    res.json(data);
    console.log(JSON.stringify(data));
  });
} catch (error) {
  console.log(error);
}

try {
  router.get("/getProduct", async (req, res) => {
    const data = await logic.getProduct();
    res.json(data);
    console.log(data);
  });
} catch (error) {
  console.log(error);
}

try {
  router.get("/getProductAttributes", async (req, res) => {
    const data = await logic.getProductAttributes();
    res.json(data);
    console.log(data);
  });
} catch (error) {
  console.log(error);
}

try {
  router.get("/getProducts", async (req, res) => {
    const data = await logic.getProducts();
    res.json(data);
    console.log(data);
  });
} catch (error) {
  console.log(error);
}

try {
  router.get("/getShipmentProducts", async (req, res) => {
    const data = await logic.getShipmentProducts();
    res.json(data);
    console.log(data);
  });
} catch (error) {
  console.log(error);
}

try {
  router.get("/searchCatalogItems", async (req, res) => {
    const data = await logic.searchCatalogItems();
    res.json(data);
    console.log();
    console.log(data.pagination);
  });
} catch (error) {
  console.log(error);
}

module.exports = router;
