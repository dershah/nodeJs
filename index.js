const hello = require("fs");
const http = require("http");
const url = require("url");
const slugify = require('slugify');

const replaceTemplate = require('./1-node-farm/starter/modules/replaceTemplates');






const tempOverview = hello.readFileSync(`${__dirname}/1-node-farm/starter/templates/overview.html`, 'utf-8');
const tempCard = hello.readFileSync(`${__dirname}/1-node-farm/starter/templates/card.html`, 'utf-8');
const tempProduct = hello.readFileSync(`${__dirname}/1-node-farm/starter/templates/product.html`, 'utf-8');

const data = hello.readFileSync(`${__dirname}/1-node-farm/starter/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);


const slugs = dataObj.map(el => slugify(el.productName, {lower: true}));
console.log(slugs)

const server = http.createServer((req, res) =>{
    
    
    const {query, pathname} = url.parse(req.url, true);

    //Overview page---------------------------------------------------------------------------------------------------------------

    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {'Content-type' : 'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join(' ');
        const output = tempOverview.replace(/%PRODUCT_CARDS%/g, cardsHtml);
        res.end(output);






    //Product page---------------------------------------------------------------------------------------------------------------

    }else if(pathname === '/product'){
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
        





        
    //API page---------------------------------------------------------------------------------------------------------------

    }else if(pathname === '/api'){
        
        
    }else{
        res.writeHead(404,{
            'content-type': 'text/html'
        });
        res.end("<h1>No page Found.</h1>");
    }
});
server.listen(8000, '127.0.0.1', () =>{
    console.log("listening to request on port 8000");
})