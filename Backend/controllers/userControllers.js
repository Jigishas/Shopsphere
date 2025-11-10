const express=require('express');
const mongoose=require('mongoose');
const users=require('../model/users');

exports.getusers = async (req,res)=>{
    try{
    const users=await users.find();
    res.status(200).json('successful');
    console.log(users)

    } catch (err){
        console.log(err);
    };
};