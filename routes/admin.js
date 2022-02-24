const express = require('express')
const AdminController = require('../controllers/admin')
const router = express.Router()

router.get('/', AdminController.allUser) //landing page admin
router.get('/delete/user/:userId', AdminController.deleteUser) //
router.get('/delete/tag/:tagId', AdminController.deleteTag) //
router.get('/delete/post/:postId', AdminController.deletePost) //




module.exports = router
