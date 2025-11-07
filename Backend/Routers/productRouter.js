const express = require('express');
const router = express.Router();
const { getAllProducts,getProductsById, postProduct, putProduct, deleteproduct } = require('../controllers/productsControllers');

// Route to get all products
router.get('/api/products', getAllProducts);
router.get('/api/products/:id', getProductsById);
router.post('/api/products', postProduct);
router.put('/api/products/:id', putProduct);
router.delete('/api/products/:id', deleteproduct);


module.exports = router;