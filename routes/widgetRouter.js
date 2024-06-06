const express = require("express");
const widgetRouter = express.Router();

const {
  postWidget,
  getWidgets,
  patchWidget,
  getWidgetsByUser,
} = require("../controllers/widgetController");

const { checkAuth } = require("../controllers/authController");

widgetRouter.post("/", postWidget);
widgetRouter.get("/", checkAuth, getWidgets);
widgetRouter.get("/:id", checkAuth, getWidgetsByUser);
widgetRouter.patch("/:id", checkAuth, patchWidget);

module.exports = widgetRouter;
