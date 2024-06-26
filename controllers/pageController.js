// controllers/pageController.js
const Page = require('../models/Page');

const addPage = async (req, res, next) => {
    try {
        const { title, content, type } = req.body;

        // Validate that type is present in the request body
        if (!type) {
            return res.status(400).json({ error: 'Type is required' });
        }

        const newPage = new Page({ title, content, type });
        await newPage.save();

        res.status(201).json({ message: 'Page added successfully', page: newPage });
    } catch (error) {
        next(error);
    }
};

const updatePage = async (req, res, next) => {
    try {
        const { pageId } = req.params;
        const { title, content, type } = req.body;

        // Validate that type is present in the request body
        if (!type) {
            return res.status(400).json({ error: 'Type is required' });
        }

        const updatedPage = await Page.findByIdAndUpdate(pageId, { title, content, type }, { new: true });

        res.status(200).json({ message: 'Page updated successfully', page: updatedPage });
    } catch (error) {
        next(error);
    }
};

const deletePage = async (req, res, next) => {
    try {
        const { pageId } = req.params;

        await Page.findByIdAndDelete(pageId);

        res.status(200).json({ message: 'Page deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addPage,
    updatePage,
    deletePage
};
