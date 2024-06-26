const User = require('../models/userModel');

const updateUserProfile = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming user ID is available in req.user after authentication
        const { firstName, lastName, phoneNumber } = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, { firstName, lastName, phoneNumber }, { new: true });

        res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
    } catch (error) {
        next(error);
    }
};

const deleteUserAccount = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming user ID is available in req.user after authentication

        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id; // Assuming the user ID is passed as a route parameter

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { firstName, lastName, phoneNumber } = user;

        res.status(200).json({ firstName, lastName, phoneNumber });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    updateUserProfile,
    deleteUserAccount,
    getUserById
};
