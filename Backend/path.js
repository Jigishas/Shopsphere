const http=require('http');
const url=require('url');
const pathe =require('path');


const server=http.createServer((req,res)=>{
    let path=req.url;
    let x=url.parse(req.url,true);
    res.end("welcome again");
    console.log(x);
})

server.listen(3000, (req,res)=>{
    console.log("server is running on port 3000");
})