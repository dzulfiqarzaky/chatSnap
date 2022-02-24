const express = require('express')
const AdminController = require('../controllers/admin')
const router = express.Router()

const session = function (req,res, next){
  console.log(req.session)
  if(req.session.id){
    let err = 'Please login'
    res.redirect(`/signIn/?error=${err}`)
  }
}

router.get('/:id', AdminController.allUser) //landing page admin
router.get('/:id/delete/user/:userId', AdminController.deleteUser) //
router.get('/:id/delete/tag/:tagId', AdminController.deleteTag) //
router.get('/:id/delete/post/:postId', AdminController.deletePost) //




module.exports = router
