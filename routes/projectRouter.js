const express = require("express");
const projectRouter = express.Router();

const {
  getFilesByProject,
  postProject,
  uploadFilesToProject,
} = require("../controllers/projectController");
const { checkAuth } = require("../controllers/authController");

projectRouter.use(checkAuth);
projectRouter.post("/", postProject);
projectRouter.get("/:projectId", getFilesByProject);
projectRouter.post("/:projectId", uploadFilesToProject);

module.exports = projectRouter;
