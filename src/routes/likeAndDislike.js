const { ObjectId } = require('mongodb')
const User = require('../models/users')

//the liked user updates the given id, and pushes the liked user to the liked array
async function likedUser(match, user){
    console.log('dit is de likeUser functie')
    console.log(`dit is van req ${match}`)
    
    try{
        await User.updateOne({
            _id: ObjectId(user._id),
        }, {
            //this operator pushes the user to the liked array
            $push:{
                liked: match,
            }
        })

        return true
    } catch (err) {
        console.log(err)
    }
}

//the disliked user updates the given id, and pushes the disliked user to the disliked array
async function dislikedUser(noMatch, user){
    console.log('dit is de dislikedUser functie')
    console.log(`dit is van ${noMatch}`)

    try {
        await User.updateOne({
          _id: ObjectId(user._id)
        }, {
            //this operator pushes the user to the disliked array
          $push: {
            disliked: noMatch,
          },
        })
        return false
    } catch(err){
        console.log(err)
    }
}

async function match(req, res, next){
    const { like } = req.body
    const { dislike } = req.body
    
    try{
        const loggedIn = await User.findOne({
            email: 'test@tester.com'
        })

        console.log(loggedIn)

        const match = await User.find({
            _id: like, 
        })

        console.log(`like is ${like}`)

        if (match[0]) {
            likedUser(like, loggedIn)
            console.log(match[0])
            console.log(`you have a match with ${match[0].first_name} `)
            res.render('match', {
              users: match,
            })
          } else{
            dislikedUser(dislike, loggedIn)
            console.log(`no match.`)
            res.redirect('/home')
          }
    } catch (error){
        next(error)
    }
}

module.exports = match