const fs = require("fs");
const express = require("express");
const { stringify } = require("querystring");

const app = express();
app.use(express.json());


/* app.get("/", (req, res)=> {
    res.status(200).json({
        massage: "Again Hello from the server Side", app: "natour"
    });
});
app.post("/post", (req, res)=> {
    res.send("For posting use this endpoint...");
});
 */

const toursData = JSON.parse(fs.readFileSync(`${__dirname}/4-natours/after-section-06/dev-data/data/tours-simple.json`));

app.get("/api/v1/tours", (req, res) => {
     res.status(200). json({
        status: "sucess",
        result: toursData.length,
        data:{
            tours: toursData
        }
     }) 
})

app.post("/api/v1/tours", (req, res) => {
    //console.log(req.body);

    const newId = toursData.length;
    //toursData[toursData.length-1].id + 1;
    const newTours= Object.assign({id: newId}, req.body);
    toursData.push(newTours);
    fs.writeFile(`${__dirname}/4-natours/after-section-06/dev-data/data/tours-simple.json`, JSON.stringify(toursData), err =>{
        res.status(201).json({
            status: "sucess", 
            data: {
                tours: newTours
            }
        })
    })
})


const port = 3000;
app.listen(port, () => {
    console.log(`App is running on Port ${port}...`);
});