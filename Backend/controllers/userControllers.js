const express=require('express');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const User=require('../model/users');


exports.getusers = async (req,res)=>{
    try{
      isAdmin=false;
      if (isAdmin==true){
    const users=await User.find();
    res.status(200).json({message: 'successful', users});
    console.log(users)
      } else {
        res.status(403).json({ message: 'Access denied' });
      }
    } catch (err){
        console.log(err);
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    };
};

exports.postusers=async (req,res)=>{
     let { name, email, password } = req.body;
    
      // Basic validation
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // sanitize/normalize
      name = name.trim();
      email = email.trim().toLowerCase();
      if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }
    
      try {
        // Check if user already exists (case‑insensitive)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(409).json({ message: 'User already exists' });
        }
    
        // Create new user
        const newUser = new User({
          name,
          email,
          password
        });
    
        const savedUser = await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
          { userId: savedUser._id, email: savedUser.email, isAdmin: savedUser.isAdmin },
          process.env.JWT_SECRET || 'your-secret-key',
          { expiresIn: '24h' }
        );
        console.log(token);
    
        res.status(201).json({
          message: 'User created successfully',
          token,
          user: { 
            id: savedUser._id, 
            name: savedUser.name, 
            email: savedUser.email,
            isAdmin: savedUser.isAdmin   
          }
        });
      } catch (error) {
        console.error('Error saving user:', error);
        // handle duplicate index error more gracefully
        if (error.code === 11000) {
          return res.status(409).json({ message: 'User already exists' });
        }
        res.status(500).json({ message: 'Error creating user', error: error.message });
      }
    };

exports.deleteusers=async (req,res)=>{
    try{
    const deleteuser=await User.findByIdAndDelete(req.params.id);
    res.status(200).json({message: 'user deleted successfully', user: deleteuser});
    console.log(deleteuser)
    } catch (err){
        console.log(err);
        res.status(500).json({ message: 'Error deleting user', error: err.message });
    };
};

exports.putusers=async (req,res)=>{
    try{
    const updateuser=await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json({message: 'user updated successfully', user: updateuser});
    console.log(updateuser)
    } catch (err){
        console.log(err);
        res.status(500).json({ message: 'Error updating user', error: err.message });
    };
};

exports.getusersbyid=async (req,res)=>{
    try{
    const getuserbyid=await User.findById(req.params.id);  
    res.status(200).json({message: 'successful', user: getuserbyid});
    console.log(getuserbyid)
    } catch (err){
        console.log(err);
        res.status(500).json({ message: 'Error fetching user', error: err.message });
    };
};
