const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  source: {
    type: String,
    required: true,
    enum: ["youtube", "spotify", "rss"],
  },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
