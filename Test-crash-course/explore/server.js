const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
    res.setHeader('Content-Type','text/html');
    
    fs.readFile('./views/hello.html',(err, data)=>{
        if(err){
            console.log("Some Error Occured",err);
        } else{
            
            res.write(data);
        }
        
        res.end();
    });
});

server.listen(3000, 'localhost', () =>{
    console.log("Listening for request on Port 3000");
});