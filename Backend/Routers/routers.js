const express=require('express');
const router=express.Router();

router.get('/api/signup', (req,res)=>{

    res.send('Signup route');
})

module.exports=router;