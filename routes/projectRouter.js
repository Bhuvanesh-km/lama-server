const express = require("express");
const projectRouter = express.Router();

const { postProject } = require("../controllers/projectController");
const { checkAuth } = require("../controllers/authController");

projectRouter.use(checkAuth);
projectRouter.post("/", postProject);

module.exports = projectRouter;
