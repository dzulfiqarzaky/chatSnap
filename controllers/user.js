const {Post, Profile, User, Tags} = require('../models')


class UserController {

    static userPage(req, res) {
        Post.findAll()
        .then(posts => {
            console.log(posts)
            res.render('./user/allPosts', {posts: posts})
        }).catch(err => {
            console.log(err)
            res.send(err)
        })
    }

    static userPost(req, res) {
        Profile.findByPk(req.params.id, {include: [{model: Post}], where: {role: 'user'}})
        .then(profile => {
            console.log(profile)
            res.render('./user/userPost', {profile})
        }).catch(err => {
            console.log(err)
            res.send(err)
        })
    }


}


module.exports = UserController