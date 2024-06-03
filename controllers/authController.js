const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (user.password !== password) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
    jwt.sign(
      { data: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }
        res.cookie("token", token, {
          maxAge: 1000 * 60 * 60,
          httpOnly: true,
          sameSite: "None",
          secure: true,
        });
        res.status(200).json({
          message: "User logged in successfully",
          user: {
            id: user._id,
          },
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
};

const checkAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const userId = decoded.data;
    req.userId = userId;
    next();
  });
};

module.exports = { login, logout, checkAuth };
