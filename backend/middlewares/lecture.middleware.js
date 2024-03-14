const jwt = require('jsonwebtoken');
const { CourseModel } = require('../models/course.model');

const fetchCourseId = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.json('Token required');
  }

  try {
    const decoded = jwt.verify(token, process.env.ADMIN_KEY);
    
    if (!decoded) {
      return res.json('You are not authorised');
    }
    
    const courseName = req.body.courseName;
    if (!courseName) {
      return res.json({ message: "Course name is required" });
    }
    
    const course = await CourseModel.findOne({ name: courseName });
    
    if (!course) {
      return res.json({ message: "Course not found" });
    }
    
    req.body.courseId = course._id;
    req.body.creatorId = decoded.id;
    console.log(req.body);
    
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { fetchCourseId };
