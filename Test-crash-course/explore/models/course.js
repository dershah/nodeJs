const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    }
},{timestamps: true});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;