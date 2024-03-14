const express = require('express')
const { connection } = require('./db')
const { userRouter } = require('./routes/user.routes')
const { discussionRouter } = require('./routes/discussion.route')
const { courseRouter } = require('./routes/course.route')
const { lectureRouter } = require('./routes/lecture.route')

const app = express()
app.use(express.json())
app.use('/auth', userRouter)
app.use('/lectures', discussionRouter)
app.use('/admin/dashboard', courseRouter)
app.use('/admin/dashboard', lectureRouter)

const PORT = 8000
app.listen(PORT, async ()=>{
    try {
        await connection
        console.log(`Server is connected at ${PORT}`);
    } catch (error) {
        console.log(error.message);
    }
})