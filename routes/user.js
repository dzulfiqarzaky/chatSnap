const express = require('express')
const UserController = require('../controllers/user')
const router = express.Router()

// router.get('/logout', Controller.logout) //logOut user')
router.get('/:id', UserController.userPage) //
router.get('/:id/post', UserController.userPost) //





module.exports = router