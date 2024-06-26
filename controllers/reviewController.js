const Product = require('../models/Product');

exports.addReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send();
    }

    product.ratings_reviews.customer_reviews.push(req.body);
    product.ratings_reviews.number_of_reviews =
      product.ratings_reviews.customer_reviews.length;
    const totalRating = product.ratings_reviews.customer_reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    product.ratings_reviews.average_rating =
      totalRating / product.ratings_reviews.number_of_reviews;

    await product.save();
    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.updateReview = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        console.log('Product not found');
        return res.status(404).send();
      }
  
      const review = product.ratings_reviews.customer_reviews.id(
        req.params.review_id
      );
      if (!review) {
        console.log('Review not found');
        return res.status(404).send();
      }
  
      console.log('Current Product:', product);
      console.log('Current Review:', review);
  
      review.set(req.body);
      await product.save();
  
      console.log('Updated Product:', product);
  
      res.send(product);
    } catch (e) {
      console.error('Error updating review:', e);
      res.status(400).send(e);
    }
  };
  
exports.deleteReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send();
    }

    product.ratings_reviews.customer_reviews.id(req.params.review_id).remove();
    product.ratings_reviews.number_of_reviews =
      product.ratings_reviews.customer_reviews.length;
    const totalRating = product.ratings_reviews.customer_reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    product.ratings_reviews.average_rating =
      totalRating / product.ratings_reviews.number_of_reviews;

    await product.save();
    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send();
    }

    res.send(product.ratings_reviews.customer_reviews);
  } catch (e) {
    res.status(500).send(e);
  }
};
