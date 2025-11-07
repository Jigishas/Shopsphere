const express = require('express');

const Products = require('../model/products');

// GET all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    console.log(products);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  } 
};
// GET single product by ID
const getProductsById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};
module.exports = { getAllProducts, getProductsById };