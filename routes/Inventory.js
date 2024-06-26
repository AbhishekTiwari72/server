const express = require('express');
const router = new express.Router();
const inventoryController = require('../controllers/inventoryController');

router.patch('/products/:id/inventory', inventoryController.updateInventory);
router.get('/products/:id/inventory', inventoryController.getInventoryById);

module.exports = router;
