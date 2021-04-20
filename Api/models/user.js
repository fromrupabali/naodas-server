const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: String,
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetCode: String,
  passwordReset: {
    type: Boolean,
    default: false,
  },
  banned: {
    type: Boolean,
    default: false,
  },
  ads: [String],
});

module.exports = mongoose.model("UserN", userSchema);
