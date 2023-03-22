const express = require("express");
const {
  getSearchHistory,
  addSearchHistory,
  updateSearchHistory
} = require("../controller/history-controller");
const historyRouter = express.Router();
// following are the routes which we used to expose the  backend service
historyRouter.post("/getSearchHistory", getSearchHistory);
historyRouter.post("/addSearchHistory", addSearchHistory);
historyRouter.post("/updateSearchHistory", updateSearchHistory);


module.exports = historyRouter;
