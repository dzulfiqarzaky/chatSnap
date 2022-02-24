const {Post, Profile, User, Tag, Post_Tag} = require('../models')
const express = require('express')
const multer = require('multer')


class UserController {

    static userPage(req, res) {
        const id = req.session.userId
        const {filter} = req.query
        let options = {include:  [{model: Tag}, {model: Profile}] }
        let posts
        if(filter){
            options.include[0].where = {id: filter}
        }
        Post.findAll(options)
        .then(data=> {
            posts = data
            return Tag.findAll()
        })
        .then(tags=> {
            res.render('./user/allPosts', {posts, tags, id})
        }).catch(err => {
            console.log(err)
            res.send(err)
        })
    }

    static userPost(req, res) {
        Profile.findByPk(req.session.userId, {include: [{model: Post}], where: {role: 'user'}})
        .then(profile => {
            res.render('./user/userPost', {profile, id: req.session.userId})
        }).catch(err => {
            res.send(err)
        })
    }

    static userPostAddForm(req, res) {
        const id = req.session.userId
        Tag.findAll()
        .then(tags => {
            res.render('./user/userPostAdd', {tags, id})
        }).catch(err => {
            res.send(err)
        })
    }

    static userPostAdd(req, res) {
        console.log(req.body)
        console.log(`masuk sini`)
        //create berulang sesuai jumlah array
        Post.create({
            title: req.body.title, 
            description: req.body.description,
            profileId: req.session.userId
        })
        .then(post => {
            const tags = req.body.tagId
            tags.forEach(tag => {
                Post_Tag.create({
                    PostId: post.id,
                    TagId: tag
                })
            })
        }).then(() =>  res.redirect(`/user/post/add/upload`))
        .catch(err => {
            console.log(err)
            res.send(err)
        })
    }
    
    static userUploadForm(req, res) {
        console.log(`masuk`)
        res.render('./user/userUploadForm')
    }

    static userUpload(req, res) {
        let id = req.session.userId
        let newFile
        //set storage
        const storage = multer.diskStorage({
            destination: './public/upload/',
            filename: function(req, file, cb){
            newFile = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
            cb(null, newFile)
            }
        })
        const upload = multer({
            storage:storage,
            limits: {fileSize: 2000000},
            fileFilter: function(req, file, cb){
            checkFileType(file, cb)
            }
        }).single('img')
        
        function checkFileType(file,cb){
            //allow extensions
            const filetypes = /jpg|jpeg|png|gif/
            //check ext
            const extname= filetypes.test(path.extname(file.originalname).toLowerCase())
            // check mimetype
            const mimetype= filetypes.test(file.mimetype)
        
            if(extname && mimetype){
            return cb(null, true)
            } else {
            cb('Images only')
            }
        }
        console.log(req.body)
        upload(req, res, (err)=> {
            if(err) {
                res.render('user/userUploadForm', {msg:err})
            } else {
                if(!req.file){
                    res.render('userAddUpload', {msg: 'no file selected'})
                } else {
                    res.render('userAddUpload', {msg: 'File uploaded', file: `upload/${req.file.filename}`})
                }
            } 
        })
        Post.update({where: { id: id }})
    }
    
    static editPostForm(req, res) {
        const id = req.session.userId
        const {postId} = req.params
        Post.findByPk(postId, {include: [{model: Tag}]})
        .then(post => {
            Tag.findAll()
            .then(tags => {
                res.render('./user/userPostEdit', {post, tags, id})
            })
        }).catch(err => {
            res.send(err)
        })
    }



    static editPost(req, res) {
        const {postId} = req.params
        Post.findByPk(postId)
        .then(post => {
            post.update({
                title: req.body.title,
                description: req.body.description
            })
        })
    }
    

    static deletePost(req,res){
        const id = req.params.postId
        Post.destroy({where: {id}})
        .then(() => {
            res.redirect(`/user/post`)
        }).catch(err => {
            console.log(err)
            res.send(err)
        })
        
    }

    static uploadImg(req,res){

    }

}


module.exports = UserController