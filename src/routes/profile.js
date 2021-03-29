const User = require('../models/users')

function profile(req, res){
    try{
        const userID = req.session.id
        console.log(userID)
    
        User.findOne({
            _id: userID
        },
        userIDFound,
        )
    
        function userIDFound(err, foundUser){
            console.log(foundUser.name)
            if(err){
                res.redirect('notFound')
            } else {
                res.render('profile', {
                    user: req.user
                })
            }
        }
    } catch (err){
        res.status(404).send(err)
    }
}

module.exports = profile

// // Find the user who has logged in and show that user profile
// function myProfile(req, res, next) {
//     db.collection('userdata').findOne({
//         _id: mongo.ObjectId(req.session.user._id)
//     }, done);
//     console.log(req.session.user._id)

//     function done(err, data) {
//         if (err) {
//             next(err)
//         } else {
//             res.render('myprofile.ejs', {
//                 data: data
//             })
//             console.log(data)
//             console.log('this is' + req.session.user._id)
//         }
//     }
// }