const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastEdited: {
    type: Date,
    default: Date.now,
  },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
  ],
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
