const User = require ('../models/users');

async function home (req, res, next) {
    try{
        const users = await User.find()
            .then((result) => {
            res.render('list', { title: 'All users', users: result})
            })
            .catch((err) => {
                console.log(err)
            })
    
    } catch (err){
        next(err)
    }
    
}

module.exports = home 
