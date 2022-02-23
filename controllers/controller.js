const {Post, Profile} = require('../models')


class Controller {

    static home(req, res) {
        res.render('index');
    }



    // ------- users ------//
    static login(req, res) {
        res.render('signup');
    }

    static signUp(req, res) {
        res.render('signup2');
    }

    // static adminPage(req, res) {
    //     res.send('adminPage');
    // }

    static userPage(req, res) {
        res.send('userPage');
    }

    static logOut(req,res){
      res.send("logOut")
    }


    static post(req, res) {

        Post.findAll()
        .then(posts => {
            console.log(posts)
            res.render('posts', {posts: posts})
        }).catch(err => {
            console.log(err)
            res.send(err)
        })
    }

    // ---------- buat admin ----------//
    static adminPage(req, res){
        Profile.findAll({where: {role: 'user'}})
        .then( users => {
            console.log(users)
            res.render('users', {users: users})
        }).catch(err => {
            console.log(err)
            res.send(err)
        })

        
    }

    // ---------- buat admin ----------//
    static deleteUser(req, res){
        Profile.destroy({where: {id: req.params.id}})
        .then(() => {
            res.redirect('/admin/users')
        }).catch(err => {
            console.log(err)
            res.send(err)
        })
    }


}

module.exports = Controller