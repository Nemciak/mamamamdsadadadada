const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userID: { type: String, required: true, unique: true },
  limit: { type: Number, default: 0 },
});

module.exports = mongoose.model("profileSchema", profileSchema);