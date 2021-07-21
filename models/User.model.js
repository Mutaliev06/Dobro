const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    tel: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    login: {
      type: String,
      required: true,
      unique: false,
    },
    password: {
      type: String,
      required: false,
    },
    pathToImage: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
