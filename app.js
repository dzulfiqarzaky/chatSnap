const express = require('express')
const routers = require('./routes')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(routers)



app.listen(port, () => console.log(` app listening on port ${port}!`))