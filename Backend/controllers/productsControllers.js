const express = require('express');
const mongoose = require('mongoose');
const Products = require('../model/products');

exports.getAllProducts = async (req, res) => {
  try {
    const products =  await Products.find();
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  } 
};

exports.getProductsById = async (req, res) => {
  try {
    
    const product = await Products.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

exports.postProduct = async (req, res) => {
  try {
    const { id, name, category, price, originalPrice, image, badge, isDeal, description, rating } = req.body;
    const newProduct = new Products({
      id,
      name,
      category,
      price,
      originalPrice,
      image,
      badge,
      isDeal,
      description: description || '',
      rating: typeof rating === 'number' ? rating : 0,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

exports.putProduct= async (req, res) => {
  try {
    const { id, name, category, price, originalPrice, image, badge, isDeal, description, rating } = req.body;
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      { id, name, category, price, originalPrice, image, badge, isDeal, description, rating },
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
    const deletedProduct = await Products.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

// add comment rating
exports.addComment = async (req, res) => {
  try {
    const { user, text, rating } = req.body;
    if (typeof rating !== 'number' || rating < 0 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 0 and 5' });
    }
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.comments.push({ user, text, rating });
    // recalc average rating
    const total = product.comments.reduce((sum, c) => sum + c.rating, 0);
    product.rating = total / product.comments.length;
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
};

//module.exports = { getAllProducts, getProductsById, postProduct, putProduct, deleteproduct};