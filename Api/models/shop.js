const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: String,
  businessHour: {
    open: String,
    close: String,
  },
  openStatus: {
    type: Boolean,
    default: true,
  },
  resetCode: String,
  passwordReset: {
    type: Boolean,
    default: false,
  },
  adminIssued: {
    type: Boolean,
    default: false,
  },
  onBoard: {
    type: Boolean,
    default: false,
  },
  banned: {
    type: Boolean,
    default: false,
  },
  memberSince: Date,
  products: [
    {
      productId: String,
      price: Number,
    },
  ],
  bkash: String,
  rocket: String,
  pendingOrders: [String],
  confirmedOrders: [String],
  cancelledOrders: [String],
  deliveredOrders: [String],
  subscriptionStatus: {
    type: Boolean,
    default: false,
  },
  subscribeFor: Date,
});

module.exports = mongoose.model("Shop", shopSchema);
