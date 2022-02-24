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

//public folder -> utk simpan ifle upload
app.use(express.static('./public'))


app.use(routers)

app.listen(port, () => console.log(` app listening on port ${port}!`))