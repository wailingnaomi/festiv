require('dotenv').config()

//packages
const ejs = require('ejs')
const express = require('express')
const bodyParser = require('body-parser')

const app = express() //start express application

const login = require('./src/routes/login')
const register = require('./src/routes/register')
const registerPage = require('./src/routes/registerPage')
const home = require('./src/routes/home')
const search = require('./src/routes/searchUser')
const profile = require('./src/routes/profile')
const match = require('./src/routes/likeAndDislike')

// Load in mongoose and make connection to database
require('./src/db/mongoose.js')

// Load in model
const User = require('./src/models/users');

(async () => {
  // User refers to our User model. We don't have to use db.collection anymore
  const users = await User.find({})

})()

app
    .set('view engine', 'ejs')
    .set('views', 'views')
    .use(express.static('static'))
    .use('/static', express.static(__dirname + '/static/'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(register)
    .use(search)
    .get('/', login) // register and login
    .get('/register', registerPage)
    .get('/home', home) // homepage with all the users
    .post('/match', match)
    .listen(8000)


function notFound(req, res) {
    res.status(404).render('notfound.ejs')
}