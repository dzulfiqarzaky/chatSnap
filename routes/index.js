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

let isLogin = function(req,res,next){
  if(req.session.userId){
    next()
  } else {
    let error = 'please login'
    res.redirect(`/signIn/?error=${error}`)
  }
}

let isAdmin = function(req,res , next){
  if(req.session.role == "admin"){
    next()
  } else {
    let error = 'need to be an admin'
    res.redirect(`/signIn/?error=${error}`)
  }
}

router.use((req, res, next) => {
  if(!req.session.userId){
      let error = 'please login'
      res.redirect(`/signIn/?error=${error}`)
  } else {
      next()
  }
})

router.get('/signUp/profile', Controller.profile) //signup/profile page
router.post('/signUp/profile', Controller.profilePost) //signup/profile post
router.get('/logOut', Controller.logOut) //log out
router.use('/user', userRouter) //user routes
router.use('/admin',  adminRouter) //admin routes

module.exports = router