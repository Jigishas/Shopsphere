const express = require('express');
const router = express.Router();
const {getAllProducts, getProductsById, postProduct, putProduct, deleteproduct } = require('../controllers/productsControllers');

// Route to get all products
// router.get('/api/products', async (req, res) => {
//   try {
//     const products =  await Products.find();
//     console.log(products);
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching products', error: error.message });
//   } 
// });
router.get('/api/products/:id', getProductsById);
router.post('/api/products', postProduct);
router.put('/api/products/:id', putProduct);
router.delete('/api/products/:id', deleteproduct);


module.exports = router;