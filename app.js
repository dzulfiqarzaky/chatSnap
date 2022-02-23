const express = require('express')
const Controller = require('./controllers/controller')
const routers = require('./routes')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use(routers)

// app.get('/') //utk homepage
app.get('/login', Controller.login) //login page
app.get('/signup', Controller.signUp) //signup
// app.post('/signup', Controller.signUp) //signup
app.get('/userPage', Controller.userPage) //
app.get('/posts', Controller.post) //
// app.get('/ad', Controller.allUsers) //
app.get('/admin/users', Controller.adminPage) //landing page admin
app.get('/admin/users/delete/:id', Controller.deleteUser) //


app.listen(port, () => console.log(` app listening on port ${port}!`))