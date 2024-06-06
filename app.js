const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
// Routes
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const projectRouter = require("./routes/projectRouter");
const widgetRouter = require("./routes/widgetRouter");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/project", projectRouter);
app.use("/api/widgets", widgetRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
