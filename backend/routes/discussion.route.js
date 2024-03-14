const express = require('express');
const { DiscussionModel } = require('../models/discussion.model');
const { discussionAuth } = require('../middlewares/discussion.middleware');

const discussionRouter = express.Router()

discussionRouter.get('/:lectureId/discussion', discussionAuth, async(req, res)=>{
    try {
        const discussion = await DiscussionModel.find({lectureId: req.body.lectureId})
        res.json(discussion);
    } catch (error) {
        next(error)
    }
})

discussionRouter.post('/:lectureId/createDiscussion', discussionAuth, async(req, res, next)=>{
    try {
        const newDiscussion = new DiscussionModel(req.body)
        await newDiscussion.save()
        res.json('New discussion created');
    } catch (error) {
        next(error)
    }
})

module.exports = {discussionRouter}

