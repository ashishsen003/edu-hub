const express = require('express');
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error');
const { UserModel } = require('../models/user.model');
const jwt = require('jsonwebtoken')

const userRouter = express.Router()

userRouter.post('/signup', async(req, res, next)=>{
    const {name, email, dateOfBirth, city, role, courses, password } = req.body

    if(!name || !email || !dateOfBirth || !city || !password || !role || name === '' || email === '' || dateOfBirth === '' || city === '' || password === '' || role === '' ){
        next(errorHandler(400, 'All fields are required'));
    }
    
    const hashpassword = bcryptjs.hashSync(password, 10)
    const newUser = new UserModel({name, email, dateOfBirth, city, role, courses, password: hashpassword})

    try {
        await newUser.save()
        res.json('SignUp Successfull');
    } catch (error) {
        next(error)
    }

})


userRouter.post('/signin', async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password || email === "" || password === "") {
      next(errorHandler(400, "All fields are required"));
    }
  
    try {
      const validUser = await UserModel.findOne({ email });
      if (!validUser) {
        return next(errorHandler(404, "User not found"));
      }
      
      if(email === 'admin@gmail.com' && password === 'admin'){
        redirectUrl = '/admin/dashboard'
        const token = jwt.sign({ id: validUser._id }, process.env.ADMIN_KEY);
        const {password: pass, ...rest} = validUser._doc
        return res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
      }
      
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) {
        return next(errorHandler(400, "Invalid Password"));
      }

      const token = jwt.sign({ id: validUser._id }, process.env.STUDENT_KEY);
      const {password: pass, ...rest} = validUser._doc
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);

    } catch (error) {
      next(error);
    }
  })

module.exports={userRouter}