const express = require('express');
const mongoose = require('mongoose');
const Products = require('../model/products');

// GET all products
const getAllProducts = async (req, res) => {
  try {
    const products =  await  Users.Products.find();
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  } 
};
// GET single product by ID
const getProductsById = async (req, res) => {
  try {
    const product = await Users.Products.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

const postProduct = async (req, res) => {
  try {
    const { id, name, category, price, originalPrice, image, badge, isDeal } = req.body;
    const newProduct = new Products({
      id,
      name,
      category,
      price,
      originalPrice,
      image,
      badge,
      isDeal
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

const putProduct= async (req, res) => {
  try {
    const { id, name, category, price, originalPrice, image, badge, isDeal } = req.body;
    const updatedProduct = await Users.Products.findByIdAndUpdate(
      req.params.id,
      { id, name, category, price, originalPrice, image, badge, isDeal },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

exports.deleteproduct= async (req, res) => {
  try {
    const deletedProduct = await Users.Products.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

module.exports = { getAllProducts, getProductsById, postProduct, putProduct, deleteproduct};