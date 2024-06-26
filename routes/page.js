// routes/page.js
const express = require('express');
const router = express.Router();
const { addPage, updatePage, deletePage } = require('../controllers/pageController');

router.post('/pages', addPage);
router.put('/pages/:pageId', updatePage);
router.delete('/pages/:pageId', deletePage);

module.exports = router;
