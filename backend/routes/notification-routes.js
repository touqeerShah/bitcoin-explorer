const express = require("express");
const {
  addNotification,
  updateNotification,
  getNotification
} = require("../controller/subscription-controller");
const notificationRouter = express.Router();
// following are the routes which we used to expose the  backend service

notificationRouter.post("/addNotification", addNotification);
notificationRouter.post("/updateNotification", updateNotification);
notificationRouter.post("/getNotification", getNotification);

module.exports = notificationRouter;
