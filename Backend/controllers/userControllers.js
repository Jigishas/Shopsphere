const express=require('express');
const mongoose=require('mongoose');
const Users=require('../model/users');

exports.getusers = async (req,res)=>{
    try{
    const users=await Users.find();
    res.status(200).json('successful');
    console.log(users)

    } catch (err){
        console.log(err);
    };
};
exports.postusers=async (req,res)=>{
     const { name, email, password } = req.body;
    
      // Basic validation
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
    
      try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
    
        // Create new user
        const newUser = new User({
          name,
          email,
          password // In a real app, hash the password
        });
    
        const savedUser = await newUser.save();
    
        res.status(201).json({
          message: 'User created successfully',
          user: { id: savedUser._id, name: savedUser.name, email: savedUser.email }
        });
      } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
      }
    };
exports.postusers = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password (in a real app, compare hashed passwords)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};