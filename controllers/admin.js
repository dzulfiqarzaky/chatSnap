const {Post, Profile, User, Tag} = require('../models')


class AdminController {

    static allUser(req, res){
        const {filter} = req.query
        const {id} = req.params
        let filters = []
        
        if(filter === 'Tag'){
            Tag.findAll()
            .then(tags => {
                filters.push(...tags)
                Profile.findByPk(id)
                .then(admin => res.render('./admin/allUser', {filters, admin}))
            }).catch(err => {
                console.log(err)
                res.send(err)
            })
        } else if(filter === 'Post'){
            Post.findAll()
            .then(posts => {
                filters.push(...posts)
                console.log(filters)
                Profile.findByPk(id)
                .then(admin => res.render('./admin/allUser', {filters, admin}))
            }).catch(err => {
                console.log(err)
                res.send(err)
            })
        } else{
            
            Profile.findAll({where: {role: 'user'}})
            .then( users => {
                Profile.findByPk(id)
                .then(admin => res.render('./admin/allUser', {users, filters, admin}))
            }).catch(err => {
                console.log(err)
                res.send(err)
            })
        }

    }
    
    static deleteUser(req, res){
        console.log(req.params)
        Profile.destroy({where: {id: req.params.userId}})
        .then(() => {
            
            res.redirect(`/admin/${req.params.id}`)
        }).catch(err => {
            console.log(err)
            res.send(err)
        })
    }

    static deleteTag(req, res){
        Tag.destroy({where: {id: req.params.tagId}})
        .then(() => {
            res.redirect(`/admin/${req.params.id}?filter=Tag`)
        }).catch(err => {
            console.log(err)
            res.send(err)
        })
    }

    static deletePost(req, res){
        Post.destroy({where: {id: req.params.postId}})
        .then(() => {
            res.redirect(`/admin/${req.params.id}?filter=Post`)
        }).catch(err => {
            console.log(err)
            res.send(err)
        })
    }
    
}

module.exports = AdminController