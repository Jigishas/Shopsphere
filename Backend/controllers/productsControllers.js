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
module.exports = { getAllProducts };