const express = require('express');
const router = new express.Router();
const productController = require('../controllers/productController');

router.post('/products', productController.addProduct);
router.get('/products/:id', productController.getProduct);
router.get('/products', productController.getAllProducts);
router.patch('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
