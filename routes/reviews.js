const express = require('express');
const router = new express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/products/:id/reviews', reviewController.addReview);
router.patch('/products/:id/reviews/:review_id', reviewController.updateReview);
router.delete('/products/:id/reviews/:review_id', reviewController.deleteReview);
router.get('/products/:id/reviews', reviewController.getAllReviews); // New route for getting all reviews

module.exports = router;
