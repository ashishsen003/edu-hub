const express = require('express')
const { fetchCourseId } = require('../middlewares/lecture.middleware')
const { LectureModel } = require('../models/lecture.model')

const lectureRouter = express.Router()

lectureRouter.post('/lecture', fetchCourseId, async(req, res, next)=>{
    try {
        const newLecture = LectureModel(req.body)
        await newLecture.save()
        res.json('New lecture added')
    } catch (error) {
        next(error)
    }    

})

module.exports={lectureRouter}


