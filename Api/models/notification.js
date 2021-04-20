const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Notification", notificationSchema);
