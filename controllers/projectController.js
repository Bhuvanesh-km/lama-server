const Project = require("../models/projectModel");
const User = require("../models/userModel");
const File = require("../models/file");

const postProject = async (req, res) => {
  try {
    const { userId } = req;
    const projectDetails = req.body;
    console.log(projectDetails);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const project = new Project(projectDetails);
    await project.save();
    user.projects.push(project._id);
    await user.save();
    res.status(201).json({
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const uploadFilesToProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    // const { userId } = req;
    const { fileName, fileLink, source } = req.body;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }
    const file = new File({
      name: fileName,
      link: fileLink,
      source,
    });
    await file.save();
    project.files.push(file._id);
    await project.save();
    res.status(200).json({
      message: "Files uploaded successfully",
      data: project,
      file: file,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getFilesByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    // console.log("projectId", projectId);
    const project = await Project.findById(projectId).populate("files");
    // console.log("project", project);
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }
    res.status(200).json({
      message: "Files fetched successfully",
      data: project.files,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { postProject, uploadFilesToProject, getFilesByProject };
