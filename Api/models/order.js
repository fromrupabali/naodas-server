const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  shopId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  orderedProducts: [
    {
      productId: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  subTotal: Number,
  deliveryFee: Number,
  total: Number,
  address: String,
  contactName: String,
  contactNumber: String,
  email: String,
  createdAt: Date,
});

module.exports = mongoose.model("OrderM", orderSchema);
