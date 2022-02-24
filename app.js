const express = require('express')
const routers = require('./routes')
const app = express()
const port = 3000
const session = require('express-session')
const multer = require('multer')
const path = require('path')


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'rahasia',
  resave: false,
  saveUninitialized: false,
  cookie:{
    secure: false,
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}))

//set storage
const storage = multer.diskStorage({
  destination: './public/upload/',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
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
//public folder -> utk simpan ifle upload
app.use(express.static('./public'))


app.use(routers)

app.listen(port, () => console.log(` app listening on port ${port}!`))