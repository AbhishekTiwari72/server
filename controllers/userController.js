const User = require('../models/User');

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


module.exports = {
    updateUserProfile,
    deleteUserAccount
};
