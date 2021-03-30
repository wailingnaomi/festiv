require('dotenv').config()

//packages
const ejs = require('ejs')
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const session = require('express-session')

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



// A folder where the uploaded files are stored
var uploadFile = multer({
    dest: 'static/uploads/'
})

// What files should de stored
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + '.jpg');
    }
});

app
    .set('view engine', 'ejs')
    .set('views', 'views')
    .use(express.static('static'))
    .use('/static', express.static(__dirname + '/static/'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(session({
        resave: false,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET
    }))
    // .use(api)
    .use(register)
    .use(search)
    .get('/', login) // register and login
    .get('/register', registerPage)
    .get('/home', home) // homepage with all the users
    .post('/match', match)
    .post('/myprofile', uploadFile.single('profilepicture'), addProfile) // add a profile from 'start'
    .get('/profile/:id', profile) // profile page
    .get('/myprofile/edit', editProfile) // edit profile 
    .post('/myprofile/:id', uploadFile.single('profilepicture'), updateProfile) // update profile with 'editProfile'
    .post('/myprofile-delete', deleteProfile) // delete profile with session
    .use(notFound)
    .listen(8000)






// if there is a session, send to home otherwise fill in data and send to home
function addProfile(req, res) {
    if (req.session.user) {
        res.redirect("/home")
    } else {
        dataProfile = {
            img: req.file ? req.file.filename : null,
            username: req.body.name,
            age: req.body.age,
            bio: req.body.bio,
            interests: req.body.interests
        };
        console.log(dataProfile)
        res.redirect("/home");
    }
}


function editProfile(req, res) {
    res.render('editprofile')
}
// Update user and send it to /myprofile
function updateProfile(req, res) {

    //https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/
    db.collection('userdata').updateOne({
        _id: ObjectId(req.session.user._id)
    }, {
        $set: //To update the values of the form
        {
            img: req.file ? req.file.filename : null,
            username: req.body.name,
            age: req.body.age,
            bio: req.body.bio,
            interests: req.body.interests
        }
    }, done);

    function done(err) {
        if (err) {
            next(err);
        } else {
            res.redirect('/myprofile')
        }
    }
}



// Delete user from databse and destroy session 
function deleteProfile(req, res) {
    db.collection('userdata').deleteOne({
        _id: ObjectId(req.session.user._id)
    }, deleteProfile);

    function deleteProfile(err) {
        if (err) {
            next(err)
            console.log('je bent niet verwijderd')
        } else {
            console.log('u destroyed session!!!!!!')
            req.session.destroy();
            res.redirect('/');
        }
    }
}


function notFound(req, res) {
    res.status(404).render('notfound.ejs')
}