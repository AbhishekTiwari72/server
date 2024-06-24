const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const verifyEmail = async (req, res, next) => {
  try {
    const token = req.query.token;
    if (!token) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    const user = await User.findOne({ emailToken: token, emailTokenExpires: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ message: 'Token is invalid or has expired' });
    }

    user.isVerified = true;
    user.emailToken = undefined;
    user.emailTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
