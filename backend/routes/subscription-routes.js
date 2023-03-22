const express = require("express");
const {
  addAndUpdateSubscription,
  updateSubscription,
  getSubscription
} = require("../controller/subscription-controller");
const subscriptionRouter = express.Router();
// following are the routes which we used to expose the  backend service

subscriptionRouter.post("/addAndUpdateSubscription", addAndUpdateSubscription);
subscriptionRouter.post("/getSubscription", getSubscription);


module.exports = subscriptionRouter;
