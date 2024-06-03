const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function () {
        return this.password === this.confirmPassword;
      },
      message: "Passwords do not match",
    },
  },
  token: String,
  otpExpires: Date,
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

userSchema.pre("findOneAndUpdate", function (next) {
  if (this.getUpdate().email) {
    return next(new Error("Email cannot be updated"));
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
