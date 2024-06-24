const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

router.post('/create-admin', adminController.createAdmin);

router.post('/login-admin', adminController.adminLogin);

// Admin profile route (requires authentication)
router.get('/profile', adminAuthMiddleware, adminController.getAdminProfile);


// Get all users route (requires authentication)
router.get('/users', adminAuthMiddleware, adminController.getAllUsers);

// Delete user by ID route (requires authentication)
router.delete('/users/:userId', adminAuthMiddleware, adminController.deleteUserById);

module.exports = router;
