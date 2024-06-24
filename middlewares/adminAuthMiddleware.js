require('dotenv').config();

const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const adminAuthMiddleware = async (req, res, next) => {
    try {
        // Extract the token from the authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log('No token provided');
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);

        console.log(decoded, "decoded");

        // Find admin by ID from decoded token
        const admin = await Admin.findById(decoded.adminId);

        // Check if admin exists
        if (!admin) {
            console.log('Admin not found');
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Attach the admin object to the request
        req.admin = admin;

        // Move to the next middleware
        next();
    } catch (error) {
        // Return unauthorized if token is invalid
        console.error('Token verification error:', error.message);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = adminAuthMiddleware;
