// models/Page.js
const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["dashboard", "profile", "user", "settings"], // optional: enum if you want to restrict values
    required: true,
  },
});

module.exports = mongoose.model("Page", pageSchema);
