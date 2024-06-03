const Project = require("../models/projectModel");
const User = require("../models/userModel");

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

module.exports = { postProject };
