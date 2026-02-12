const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/productsControllers');

router.get('/products', productsControllers.getAllProducts);
router.get('/products/:id', productsControllers.getProductsById);
router.post('/products', productsControllers.postProduct);
router.put('/products/:id', productsControllers.putProduct);
router.delete('/products/:id', productsControllers.deleteproduct);



module.exports = router;
