const express = require('express')
const Controller = require('../controllers')
const UserController = require('../controllers/user')
const router = express.Router()



// router.get('/logout', Controller.logout) //logOut user')
router.get('/', UserController.userPage) // show all posts
router.get('/post', UserController.userPost) // show all posts by id
router.get('/post/add', UserController.userPostAddForm) // show add post form
router.post('/post/add', UserController.userPostAdd) // add post
router.get('/post/add/upload', UserController.userUploadForm) // add multer
router.post('/post/add/upload', UserController.userUpload) // add multer
router.get('/post/:postId/edit', UserController.editPostForm) // edit post
router.post('/post/:postId/edit', UserController.editPost) // edit post
router.get('/post/:postId/delete', UserController.deletePost) // add multer





module.exports = router