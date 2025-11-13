const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/productsControllers');

router.get ('/api/products', productsControllers.getAllProducts);
router.get('/api/products/:id', productsControllers.getProductsById);
router.post('/api/products', productsControllers.postProduct);
router.put('/api/products/:id', productsControllers.putProduct);
router.delete('/api/products/:id', productsControllers.deleteproduct);


module.exports = router;