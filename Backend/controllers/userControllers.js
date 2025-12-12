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
exports.deleteusers=async (req,res)=>{
    try{
    const deleteuser=await Users.findByIdAndDelete(req.params.id);
    res.status(200).json('user deleted successfully');
    console.log(deleteuser)
    } catch (err){
        console.log(err);
    };
};
exports.putusers=async (req,res)=>{
    try{
    const updateuser=await Users.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json('user updated successfully');
    console.log(updateuser)
    } catch (err){
        console.log(err);
    };
};
exports.getusersbyid=async (req,res)=>{
    try{
    const getuserbyid=await Users.findById(req.params.id);  
    res.status(200).json('successful');
    console.log(getuserbyid)
    } catch (err){
        console.log(err);
    };
};
