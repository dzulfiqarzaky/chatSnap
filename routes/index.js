const express = require('express')
const Controller = require('../controllers/')
const adminRouter = require('./admin')
const userRouter = require('./user')
const router = express.Router()

router.get('/', Controller.home)
router.get('/signIn', Controller.signIn) //signIn page
router.post('/signIn', Controller.signInPost) //signIn page
router.get('/signUp', Controller.signUp) //signup page
router.post('/signUp', Controller.signUpPost) //signup post
router.get('/signUp/profile', Controller.profile) //signup/profile page
router.post('/signUp/profile', Controller.profilePost) //signup/profile post


router.use('/user', userRouter) //user routes

router.use('/admin', adminRouter) //admin routes

module.exports = router