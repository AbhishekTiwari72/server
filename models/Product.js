const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_id: String,
  name: String,
  description: String,
  category: String,
  brand: String,
  sku: String,
  upc: String,
  price: Number,
  currency: String,
  attributes: {
    color: String,
    size: String,
    weight: String,
    dimensions: String
  },
  inventory: {
    stock_quantity: Number,
    warehouse_location: String
  },
  images: [{
    url: String,
    alt_text: String
  }],
  ratings_reviews: {
    average_rating: Number,
    number_of_reviews: Number,
    customer_reviews: [{
      review_id: String,
      customer_id: String,
      rating: Number,
      review: String
    }]
  },
  shipping_info: {
    shipping_weight: String,
    shipping_dimensions: String,
    shipping_cost: Number,
    shipping_methods: [String]
  },
  additional_info: {
    manufacturer: String,
    supplier: String,
    warranty: String,
    return_policy: String
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
