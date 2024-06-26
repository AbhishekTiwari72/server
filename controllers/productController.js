// controllers/productsController.js

const Product = require("../models/Product");

// Add a new product
exports.addProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    res.status(201).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Get a product by ID
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
};

exports.getAllProducts = async (req, res) => {
  const sortField1 = req.query.sortBy1;
  const sortOrder1 = req.query.sortOrder1 === "desc" ? -1 : 1;
  const sortField2 = req.query.sortBy2;
  const sortOrder2 = req.query.sortOrder2 === "desc" ? -1 : 1;
  const category = req.query.category;
  const minRating = req.query.minRating || 0; // Minimum rating threshold

  console.log(req.query, "Request");

  let query = {};

  // Filter by category if provided
  if (category) {
    query.category = category;
  }

  // Ensure the minimum rating is part of the query
  if (minRating) {
    query["ratings_reviews.average_rating"] = { $gte: minRating };
  }

  try {
    let products;
    const sortCriteria = {};

    // Add primary sort field
    if (sortField1 === "price") {
      sortCriteria.price = sortOrder1;
    } else if (sortField1 === "rating") {
      sortCriteria["ratings_reviews.average_rating"] = sortOrder1;
    }

    // Add secondary sort field
    if (sortField2 === "price") {
      sortCriteria.price = sortOrder2;
    } else if (sortField2 === "rating") {
      sortCriteria["ratings_reviews.average_rating"] = sortOrder2;
    }

    console.log("Sort Criteria:", sortCriteria);

    products = await Product.find(query).sort(sortCriteria);

    res.send(products);
  } catch (e) {
    console.error('Error fetching products:', e);
    res.status(500).send();
  }
};


// Update a product by ID
exports.updateProduct = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "description",
    "category",
    "price",
    "ratings_reviews",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send();
    }

    updates.forEach((update) => (product[update] = req.body[update]));
    await product.save();
    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (e) {
    res.status(500).send();
  }
};
