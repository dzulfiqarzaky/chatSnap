const {Post, Profile, User, Tags} = require('../models')
const bcrypt = require('bcryptjs')

class Controller {

    static home(req, res) {
        res.render('index');
    }

    static signIn(req, res) {
        const errors = req.query.error
        res.render('signIn', {errors});
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
        console.log(req.session, req.body)
        User.create({
            name: req.body.name,
            born: req.body.born,
            address: req.body.address
        })
        .then((user) => {
            req.session.userId = user.id
            console.log(`masuk`)
            res.redirect(`/signUp/profile/`)
        })
        .catch(err => {
            console.log(err)
            if(err.name === 'SequelizeValidationError') { 
                let errors = err.errors.map(val => val.message)
                res.send(errors)
            } else {
            res.send(err)
            }
        })
    }

    static profile(req, res) {
        console.log(req.session, '<<< profile')
        const id = req.session.userId
        console.log(id, '<<< id di profile')
        res.render('profile', {id});
    }

    static profilePost(req, res) {
        const {role}= req.body

        if(role === 'admin'){ 
            res.render('APRILFOO')
            // setTimeout(() => {
            //     res.redirect('/')
            // }, 2000);
        } else {       
            Profile.create({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                userId: req.session.userId,
                role: req.body.role
            })
            .then(() => {
                // if(profile.role === 'user'){
                    res.redirect(`/user/`) //user/:id
                // } else {
                //     res.redirect(`/admin/`) //admin/:id
                // }
            })
            .catch(err => {
                if(err.name === 'SequelizeValidationError') {
                    let errors = err.errors.map(val => val.message)
                    res.send(errors)
                } else {
                res.send(err)
                }
            })
        }
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