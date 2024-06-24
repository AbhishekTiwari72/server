const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

const signup = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPassword,
      image,
      role, // Add role here
    } = req.body;

    console.log(req.body, "req.body");

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const emailToken = crypto.randomBytes(32).toString("hex");
    const emailTokenExpires = Date.now() + 5 * 60 * 1000; // 5 minutes

    const user = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashedPassword,
      image,
      role, // Save role here
      emailToken,
      emailTokenExpires,
    });
    await user.save();

    const url = `${req.protocol}://${req.get(
      "host"
    )}/api/auth/verify-email?token=${emailToken}`;

    await sendEmail(
      user.email,
      "Verify Email",
      `Click this link to verify your email: ${url}`
    );

    res.status(201).json({
      message:
        "User created successfully. Please verify your email within 5 minutes else the token will expire.",
    });
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};

const login = async (req, res, next) => {
  try {
    console.log(req.body, "req.body"); // Add this line to log the request body

    const { email, password } = req.body;

    // Validate the email and password format
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: "Invalid email or password format" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successfully",
      token,
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    });
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};

  
  module.exports = { signup, login };
  