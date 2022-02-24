const {Post, Profile, User, Tags} = require('../models')
const bcrypt = require('bcryptjs')

class Controller {

    static home(req, res) {
        res.render('index');
    }

    static signIn(req, res) {
        res.render('signIn');
    }

    static signInPost(req, res) {
        const {username, password} = req.body
        Profile.findOne({
            where: {username}
        })
        .then(user=> {
            if(user){
                const validPass = bcrypt.compareSync(password, user.password)
                if(validPass){
                    req.session.userId = user.id
                    req.session.role = user.role
                    if(user.role === 'user'){
                        res.redirect(`/user`)
                    } else {
                        res.redirect(`/admin`)
                    }
                } else {
                    let error = 'invalid username or password'
                    res.redirect(`/signIn?error=${error}`)
                }
            } 
        })
        .catch(err => {
            err = 'user not found'
            res.redirect(`/signIn?error=${err}`)
        })
    }

    static signUp(req, res) {
        res.render('signup');
    }

    static signUpPost(req, res) {
        User.create({
            name: req.body.name,
            born: req.body.born,
            address: req.body.address,
        })
        .then((user) => {
            res.redirect(`/signUp/profile/?id=${user.id}`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static profile(req, res) {
        const {id} = req.query
        res.render('profile', {id});
    }

    static profilePost(req, res) {
        Profile.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            userId: req.body.userId,
            role: req.body.role
        })
        .then((profile) => {
            if(profile.role === 'user'){
                res.redirect(`/user/${profile.id}`) //user/:id
            } else {
                res.redirect(`/admin/${profile.id}`) //admin/:id
            }
        })
        .catch(err => {
            res.send(err)
        })
    }

    static userPage(req, res) {
        res.send('userPage');
    }

    static logOut(req, res) {
        req.session.destroy((err) => {
          if (err){
            res.send(err)
          } else {
            res.redirect('/signIn')
          }
        })
      }

}

module.exports = Controller