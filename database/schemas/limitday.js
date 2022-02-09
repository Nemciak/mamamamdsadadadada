const mongoose = require("mongoose");

const limitSchema = new mongoose.Schema({
  userID: { type: String, require: true, unique: true },
  limit: { type: Number, default: 1},
});

const model = mongoose.model("ProfileModels", limitSchema);

module.exports = model;