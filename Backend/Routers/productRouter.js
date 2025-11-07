const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controllers/productsControllers');

// Route to get all products
router.get('/api/products', getAllProducts);
router.get('/api/products/:id', getProductsById);
router.post('/api/product', postProduct);

module.exports = router;