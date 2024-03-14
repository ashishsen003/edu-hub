const express = require('express');
const { CourseModel } = require('../models/course.model');

const courseRouter = express.Router()

courseRouter.post('/course', async(req, res, next)=>{
    try {
        const newCourse = new CourseModel(req.body)
        await newCourse.save()
        res.json('New course added');
    } catch (error) {
        next(error)
    }
})

module.exports={courseRouter}