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