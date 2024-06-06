const mongoose = require("mongoose");

const widgetModelSchema = new mongoose.Schema({
  chatBotName: {
    type: String,
    default: "ChatBot",
  },
  welcomeMessage: {
    type: String,
    default: "You are welcome",
  },
  inputPlaceholder: {
    type: String,
    default: "Type a message",
  },
  primaryColor: {
    type: String,
    default: "#000000",
  },
  fontColor: {
    type: String,
    default: "#000000",
  },
  fontSize: {
    type: Number,
    default: 16,
  },
  chatHeight: {
    type: String,
    default: "lorem ipsum",
  },
  chatIconSize: {
    type: Number,
    default: 20,
  },
  postionOnScreen: {
    type: String,
    default: "bottom-right",
  },
  distanceFromBottom: {
    type: Number,
    default: 20,
  },
  horizontalDistance: {
    type: Number,
    default: 20,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const WidgetModel = mongoose.model("WidgetModel", widgetModelSchema);

module.exports = WidgetModel;
