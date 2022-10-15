const fs = require("fs");
const express = require("express");

const toursData = JSON.parse(fs.readFileSync(`${__dirname}/../4-natours/after-section-06/dev-data/data/tours-simple.json`));

const getAllUsers= (req, res) => {
    res.status(500).json({
        status: "Error::::::::::::::::*____",
        massage: "The route is not defined."
    });
}
const getUser= (req, res) => {
    res.status(500).json({
        status: "Error::::::::::::::::*____",
        massage: "The route is not defined."
    });
}
const createUser= (req, res) => {
    res.status(500).json({
        status: "Error::::::::::::::::*____",
        massage: "The route is not defined."
    });
}
const updateUser= (req, res) => {
    res.status(500).json({
        status: "Error::::::::::::::::*____",
        massage: "The route is not defined."
    });
}
const deleteUser= (req, res) => {
    res.status(500).json({
        status: "Error::::::::::::::::*____",
        massage: "The route is not defined."
    });
}



const router = express.Router();

router
    .route("/")
    .get(getAllUsers)
    .post(createUser);

router
    .route("/:id")
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

    
module.exports=router