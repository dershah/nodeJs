const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Course = require('./models/course');

//express app

const app = express();
const dbUrl = 'mongodb+srv://helloThere21:ddX3rhYKrZdbImXA@cluster0.26w2dwc.mongodb.net/';

//Connect to Mongodb

mongoose.connect(dbUrl,{useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));



//register View Engine
app.set('view engine','ejs');

//middleware & Static Fields

app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));

app.use((req, res, next)=>{
    console.log("Hello from Middleware 🖐️");
    next();
});
app.get('/all-courses', (req, res)=>{
    res.redirect('/search');
});


app.get('/', (req, res)=>{
    const contents =[
        {title:'Current Events', content:['anything else', 'random stuffs', 'Toyota','Kia']},
        {title:'Announcment', content:['Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.']},
        {title:'Appointment', content:['Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.']}
    ]
    res.render('home',{title:'Home', contents});
});


app.get('/courses', (req, res)=>{
    res.render('courses',{title:'Courses'});
});

app.get('/planer', (req, res)=>{
    res.render('planer',{title:'Planer'});
});

app.get('/search', (req, res)=>{
    Course.find()
    .then((result) =>{
        res.render('search',{title:"Search", courses: result});
    })
    .catch((err) => console.log(err));
    
});

// create courses(POST Method)
app.post('/search',(req, res)=>{
    const course= new Course(req.body);
    course.save()
    .then((result) =>{
        res.redirect('/search');
    })
    .catch((err) => console.log(err));
});

app.get('/course/:id', (req, res)=> {
    const id= req.params.id;
    Course.findById(id)
    .then(result=>{
        console.log(result);
        res.render('details', {course:result, title:"Course Detail"});
    }).catch(err=> console.log(err));
});
app.get('/create', (req, res)=>{
    res.render('create', {title:'Create'});
});

//redirect
app.get('/course', (req, res)=>{
    res.redirect('/course');
});

//404 page

app.use( (req, res)=>{
    res.status(404  ),res.render('404',{title:'Error Occurred'});
});