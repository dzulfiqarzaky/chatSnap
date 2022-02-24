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
                    console.log(req.session, 'validPass1')
                    req.session.userId = user.id
                    req.session.role = user.role
                    console.log(req.session, 'validPass2')
                    if(user.role === 'user'){
                        res.redirect(`/user/${user.id}`)
                    } else {
                        res.redirect(`/admin/${user.id}`)
                    }
                    // return res.redirect('/users')
                } else {
                    console.log(err)
                    let error = 'invalid username or password'
                    return res.redirect('')
                }
            } 
        })
        .catch(err => {
            console.log(err, 'catch')
            err = 'user not found'
            res.redirect('')
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
            console.log(err)
            res.send(err)
        })
    }

    static profile(req, res) {
        const {id} = req.query
        res.render('profile', {id});
    }

    static profilePost(req, res) {
        console.log(req.body)
        Profile.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            userId: req.body.userId,
            role: req.body.role
        })
        .then((profile) => {
            console.log(profile)
            if(profile.role === 'user'){
                res.redirect(`/user/${profile.id}`) //user/:id
            } else {
                res.redirect(`/admin/${profile.id}`) //admin/:id
            }
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
    }

    static userPage(req, res) {
        res.send('userPage');
    }

    static logOut(req,res){
      res.send("logOut")
    }

}

module.exports = Controller