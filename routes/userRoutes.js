// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET user by ID
router.get('/:id', userController.getUserById);

module.exports = router;
