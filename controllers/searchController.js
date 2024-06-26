// controllers/searchController.js
const User = require("../models/userModel");
const Page = require("../models/Page");
const Product = require("../models/Product"); // Import Product model

const search = async (req, res, next) => {
  try {
    const { keyword } = req.query;

    // Search Users
    const users = await User.find({
      $or: [
        { firstName: new RegExp(keyword, "i") },
        { lastName: new RegExp(keyword, "i") },
        { email: new RegExp(keyword, "i") },
      ],
    }).lean();

    // Add URLs to user results
    const usersWithUrls = users.map((user) => ({
      ...user,
      url: `/profile/${user._id}`,
    }));

    // Search Pages
    const pages = await Page.find({
      $or: [
        { title: new RegExp(keyword, "i") },
        { content: new RegExp(keyword, "i") },
      ],
    }).lean();

    // Add URLs to page results based on the type
    const pagesWithUrls = pages.map((page) => {
      let url;
      switch (page.type) {
        case "dashboard":
          url = "/dashboard";
          break;
        case "profile":
          url = "/profile";
          break;
        case "user":
          url = `/user/${page._id}`;
          break;
        case "setting":
          url = "/settings";
          break;
        default:
          url = "/";
      }
      return {
        ...page,
        url,
      };
    });

    // Search Products
    const products = await Product.find({
      $or: [
        { name: new RegExp(keyword, "i") },
        { description: new RegExp(keyword, "i") },
      ],
    }).lean();

    // Add URLs to product results
    const productsWithUrls = products.map((product) => ({
      ...product,
      url: `/products/${product._id}`,
    }));

    res.status(200).json({
      users: usersWithUrls,
      pages: pagesWithUrls,
      products: productsWithUrls, // Include products in the response
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  search,
};
