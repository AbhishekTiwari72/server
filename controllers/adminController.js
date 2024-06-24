require('dotenv').config();
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const generateJWTToken = (adminId) => {
    // Replace 'YOUR_SECRET_KEY' with your actual secret key for JWT token
    const token = jwt.sign({ adminId }, process.env.JWT_SECRET_ADMIN, { expiresIn: '1h' });
    return token;
};


const createAdmin = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;

        // Check if admin with the same email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists with this email' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin
        const admin = new Admin({
            email,
            password: hashedPassword,
            role // Include role field
        });
        await admin.save();

        res.status(201).json({ message: 'Admin account created successfully' });
    } catch (error) {
        next(error);
    }
};



const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate and return JWT token for authenticated admin
        const token = generateJWTToken(admin.id); // Implement token generation function
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};


const getAdminProfile = async (req, res, next) => {
    try {
        if (!req.admin || !req.admin.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const adminId = req.admin.id;
        const admin = await Admin.findById(adminId);

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json(admin);
    } catch (error) {
        next(error);
    }
};


const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, '-password'); // Exclude password field from response

        res.status(200).json({ users });
    } catch (error) {
        next(error);
    }
};

const deleteUserById = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createAdmin,
    adminLogin,
    getAdminProfile,
    getAllUsers,
    deleteUserById
};
