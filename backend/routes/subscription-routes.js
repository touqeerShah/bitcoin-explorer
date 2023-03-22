const express = require("express");
const {
  addSubscription,
  updateSubscription,
  getSubscription
} = require("../controller/subscription-controller");
const subscriptionRouter = express.Router();
// following are the routes which we used to expose the  backend service

subscriptionRouter.post("/addSubscription", addSubscription);
subscriptionRouter.post("/updateSubscription", updateSubscription);
subscriptionRouter.post("/getSubscription", getSubscription);


module.exports = subscriptionRouter;
