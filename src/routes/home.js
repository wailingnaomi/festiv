const User = require ('../models/users');
const email = require ('./register')
// const session = require('express-session')
const { ObjectId } = require('mongodb')

async function home (req, res, next) {
    try{

        const loggedIn = await User.findOne({
           email: 'test@tester.com'
        //    _id: ObjectId(req.user._id),
        })

        // console.log(email)
        console.log('i am logged in as ' + loggedIn)

        const allUsers = await User.find({
            $and: [
                {
                email: {
                  $ne: loggedIn.email,
                },
              },
              {
                _id: {
                  // all liked users are saved in the liked array
                  // this operator wont let the liked user appear in the homepage
                  $nin: loggedIn.liked,
                },
              },
              {
                _id: {
                  // all liked users are saved in the liked array
                  // this operator wont let the liked user appear in the homepage
                  $nin: loggedIn.disliked,
                },
              },
              ],
        
        })

        // console.log('all users ' + allUsers)

        res.render('home', {
            title: 'All users',
            users: allUsers
        })
        // console.log(req.session.user)
    
    } catch (err){
        next(err)
    }
    
}

module.exports = home 
