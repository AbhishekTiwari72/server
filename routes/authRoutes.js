const express = require('express');
const { signup, login } = require('../controllers/authController');
const verifyEmail = require('../middlewares/verifyEmail');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify-email', verifyEmail);

module.exports = router;
