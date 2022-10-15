const fs = require("fs");
const express = require("express");


const toursData = JSON.parse(fs.readFileSync(`${__dirname}/../4-natours/after-section-06/dev-data/data/tours-simple.json`));

const getTours= (req, res) => {
    res.status(200). json({
       status: "sucess",
       result: toursData.length,
       data:{
           tours: toursData
       }
    }) 
}

const getTour= (req, res) => {
    console.log(req.params);
    console.log(req.body);

    const id = req.params.id*1;
    const tour = toursData.find(el => el.id === id);

    if(!tour){
        return res.status(404).json({
            status: "fail",
            massage: "Invalid Input"
        })
    }
    res.status(200). json({
       status: "sucess",
       data:{
           tour
       }
    }) 
}

const createTour= (req, res) => {
    //console.log(req.body);

    const newId = toursData.length;
    //toursData[toursData.length-1].id + 1;
    const newTours= Object.assign({id: newId}, req.body);
    toursData.push(newTours);
    fs.writeFile(`${__dirname}/../4-natours/after-section-06/dev-data/data/tours-simple.json`, JSON.stringify(toursData), err =>{
        res.status(201).json({
            status: "sucess", 
            data: {
                tours: newTours
            }
        })
    })
}

const updateTour= (req, res) => {
    
    if(req.params.id< toursData.length){
        return res.status(404).json({
            status: "fail",
            massage: "Invalid Input"
        })
    }
    res.status(200). json({
       status: "sucess",
       data:{
           tour: "<Tour is upto date>"
       }
    }) 
}

const deleteTour= (req, res) => {
    
    if(req.params.id< toursData.length){
        return res.status(404).json({
            status: "fail",
            massage: "Invalid Input"
        })
    }
}


const router = express.Router();


router
    .route("/")
    .get(getTours)
    .post(createTour);

router
    .route("/:id")
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

module.exports=router