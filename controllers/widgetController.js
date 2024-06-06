const WidgetModel = require("../models/widgetModel");

const postWidget = async (req, res) => {
  try {
    const widget = new WidgetModel(req.body);
    await widget.save();
    res.status(201).json({
      message: "Widget created successfully",
      data: widget,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getWidgetsByUser = async (req, res) => {
  try {
    const { userId } = req;
    const widgets = await WidgetModel.find({ user: userId });
    res.status(200).json({
      message: "Widgets retrieved successfully",
      data: widgets,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getWidgets = async (req, res) => {
  try {
    const widgets = await WidgetModel.find();
    res.status(200).json({
      message: "Widgets retrieved successfully",
      data: widgets,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const patchWidget = async (req, res) => {
  try {
    const { userId } = req;
    const widgetData = req.body;
    const widget = await WidgetModel.findOne({ user: userId });
    if (!widget) {
      return res.status(404).json({
        message: "Widget not found",
      });
    }
    widget.set(widgetData);
    await widget.save();
    res.status(200).json({
      message: "Widget updated successfully",
      data: widget,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { postWidget, getWidgets, patchWidget, getWidgetsByUser };
