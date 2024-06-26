const Product = require("../models/Product");

exports.updateInventory = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send();
    }

    product.inventory = req.body;
    await product.save();
    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.getInventoryById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send();
    }

    res.send(product.inventory);
  } catch (e) {
    res.status(500).send(e);
  }
};
