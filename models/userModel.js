const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  isVerified: { type: Boolean, default: false },
  role: { type: String, required: true },
  emailToken: { type: String },
  emailTokenExpires: { type: Date },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
