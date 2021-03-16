const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongo = require('mongodb')
const multer = require('multer')
const session = require('express-session')

const api = new express.Router();

require('dotenv').config()

// Connect server with database
let db = null
const url = process.env.DB_URL
const ObjectId = require('mongodb').ObjectID;

mongo.MongoClient.connect(url, function (err, client) {
    if (err) {
        throw err
    }

    db = client.db(process.env.DB_NAME)
});



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
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(session({
        resave: false,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET
    }))
    .use(api)
    .get('/', start) // register and login
    .get('/home', users) // homepage with all the users
    .post('/myprofile', uploadFile.single('profilepicture'), addProfile) // add a profile from 'start'
    .get('/myprofile', myProfile) // profile page
    .get('/myprofile/edit', editProfile) // edit profile 
    .post('/myprofile/:id', uploadFile.single('profilepicture'), updateProfile) // update profile with 'editProfile'
    .post('/myprofile-delete', deleteProfile) // delete profile with session
    .delete('/home/:id', remove) // dislike a profile
    .use(notFound)
    .listen(8000)


function start(req, res) {

    res.render('start.ejs')

}


function users(req, res) {
    // Find only male users in collection userdata and send that to list.ejs
    db.collection('userdata').find({
        gender: "male"
    }).toArray(done)

    function done(err, data) {
        if (err) {
            console.log('hier gata het fout')
            console.log(err)

        } else {
            res.render('list.ejs', {
                data: data
            })
            console.log(req.session.user)
        }
    }

    // If there is no user signed in
    if (!req.session.user) {
        //try to insert a user and the data to the collection userdata of the session
        try {
            req.session.user = dataProfile
            // console.log(dataProfile)
            db.collection('userdata').insertOne(req.session.user, registerUser);

            function registerUser(err, data) {
                if (err) {
                    console.log('hier is fout nummero 2')
                    console.log(err)
                } else {
                    req.session.user._id = data.insertedId;
                    // console.log(req.session.user)
                    // console.log('ewaaaaa')
                }
            }
        } catch (e) {
            console.log('nooooopeeeeeeee')
            console.log(e);
            res.status(400).send(e)
        }
    }
}


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


// Classmate Brian helped me to write this function
function remove(req, res) {
    // Get ID of a user
    const itemID = req.params.id;
    console.log(itemID)

    try {
        // Delete an ID from the collection userdata
        db.collection('userdata').deleteOne({
            "_id": ObjectId(itemID)
        });
        console.log(itemID); // To check which ID is going to be deleted
        console.log('deleted');
        res.status(200).send('deleted');
    } catch (e) {
        console.log('failed')
        console.log(e);
        res.status(400).send(e)
    }
}

//search for interests
api.get('/search:term', (req, res) => {

    // console.log(req.params.term.replace(":", ""));
    // console.log(req.params.term)
    // console.log(req.params)

    // Find users with the filled in value
    db.collection("userdata").find({
        gender: "male",
        interests: req.params.term.replace(":", "")
    }).toArray(done);

    function done(err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
            res.send(data)
        }
    }
});

// Find the user who has logged in and show that user profile
function myProfile(req, res, next) {
    db.collection('userdata').findOne({
        _id: mongo.ObjectId(req.session.user._id)
    }, done);
    console.log(req.session.user._id)

    function done(err, data) {
        if (err) {
            next(err)
        } else {
            res.render('myprofile.ejs', {
                data: data
            })
            console.log(data)
            console.log('this is' + req.session.user._id)
        }
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