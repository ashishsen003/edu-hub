const jwt = require('jsonwebtoken')

const discussionAuth = (req, res, next)=>{
    const token = req.headers.authorization?.split(' ')[1]
    const {lectureId} = req.params

    if(token){
        jwt.verify(token, process.env.STUDENT_KEY, (err, decoded)=>{
            if(decoded){
                // console.log(decoded);
                req.body.userId = decoded.id
                req.body.lectureId = lectureId
                // console.log(req.body);
                next()
            }
        })
    }
    // console.log(req);
}

module.exports={discussionAuth}

