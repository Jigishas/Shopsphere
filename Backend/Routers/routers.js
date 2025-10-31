const express=require('epress');
const router=express.Router();

router.get('/api/signup', (req,res)=>{

    res.send('Signup route');
})

module.exports=router;