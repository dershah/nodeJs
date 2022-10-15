const fs = require("fs");
const express = require("express");
//const { stringify } = require("querystring"); 
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();


//------------------------------------------------Middlewares---------------------------------------------------------


app.use(morgan("dev"));

app.use(express.json());

app.use((req, res, next) => {
    console.log("testing Middleware");
    next();
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(req.requestTime);
    next();
})

/* app.get("/", (req, res)=> {
    res.status(200).json({
        massage: "Again Hello from the server Side", app: "natour"
    });
});
app.post("/post", (req, res)=> {
    res.send("For posting use this endpoint...");
});
 */




//----------------------------------------------Route Handlers-----------------------------------------------




//------------------------------------------------------------Routes-------------------------------------------
/* 
app.get("/api/v1/tours", getTours)
app.get("/api/v1/tours/:id", getTour)
app.post("/api/v1/tours", createTour)
app.patch("api/v1/tours/:id", updateTour)
app.delete("api/v1/tours/:id", deleteTour)
 */



    app.use("/api/v1/tours", tourRouter);
    app.use("/api/v1/users", userRouter);

///----------------------------------------------------------------start Server-----------------------------------------
const port = 3000;
app.listen(port, () => {
    console.log(`App is running on Port ${port}...`);
});