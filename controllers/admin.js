const {Post, Profile, User, Tag} = require('../models')
const randomQuotes = require('../helper/quotes')

class AdminController {

    static allUser(req, res){
        
        const {filter} = req.query
        const id = req.session.userId
        let filters = []
        
        if(filter === 'Tag'){
            Tag.findAll()
            .then(tags => {
                filters.push(...tags)
                Profile.findByPk(id)
                .then(admin => res.render('./admin/allUser', {filters, admin, randomQuotes}))
            }).catch(err => {
                res.send(err)
            })
        } else if(filter === 'Post'){
            Post.findAll()
            .then(posts => {
                filters.push(...posts)
                Profile.findByPk(id)
                .then(admin => res.render('./admin/allUser', {filters, admin, randomQuotes}))
            }).catch(err => {
                res.send(err)
            })
        } else{
            let users
            let admin
            Profile.findAll({include: User, where: {role: 'user'}})
            .then( user => {
                users = user
                return Profile.findByPk(id)
            })
            .then(single => {
                admin = single
                return Profile.sum()
            })
            .then(sum => res.render('./admin/allUser', {users, filters, admin, sum, randomQuotes}))
            .catch(err => {
                res.send(err)
            })
        }

    }
    
    static deleteUser(req, res){

        Profile.destroy({where: {id: req.params.userId}})
        .then(() => {
            res.redirect(`/admin/`)
        }).catch(err => {
            res.send(err)
        })
    }

    static deleteTag(req, res){
        Tag.destroy({where: {id: req.params.tagId}})
        .then(() => {
            res.redirect(`/admin/?filter=Tag`)
        }).catch(err => {
            res.send(err)
        })
    }

    static deletePost(req, res){
        Post.destroy({where: {id: req.params.postId}})
        .then(() => {
            res.redirect(`/admin/?filter=Post`)
        }).catch(err => {
            res.send(err)
        })
    }
    
}

module.exports = AdminController