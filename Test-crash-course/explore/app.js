const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const {Course} = require('./models/model');
const { Announcment } = require('./models/model');

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
        ]

    Announcment.find()
    .then((result) =>{
        let value= JSON.stringify({contents, announcments: result});
        res.render('home',{title:'hello', value});
        console.log(value);
    })
    .catch((err) => console.log(err));
    //res.render('home',{title:'Home', contents});
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

app.post('/announcment',(req, res)=>{
    const announcment= new Announcment(req.body);
    announcment.save()
    .then((result) =>{
        res.redirect('/');
    })
    .catch((err) => console.log(err));
});
app.get('/announcment', (req, res)=> {
    res.render('announcment',{title:'Announcment'});
});
//redirect
app.get('/course', (req, res)=>{
    res.redirect('/course');
});

//404 page

app.use( (req, res)=>{
    res.status(404  ),res.render('404',{title:'Error Occurred'});
});