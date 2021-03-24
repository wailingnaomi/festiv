const User = require ('../models/users');
const test = require ('./register')

async function home (req, res, next) {
    try{
        const loggedIn = await User.findOne({
           _id: req.body._id
        })
        
        console.log('i am logged in as ' + loggedIn)

        const allUsers = await User.find({
            $and: [{
                _id: {
                  $ne: User._id,
                },
              },
              ],
        
        })

        console.log('all users ' + allUsers)


        

        res.render('home', {
            title: 'All users',
            users: allUsers
        })

        // const users = await User.find()
        //     .then((result) => {
        //     res.render('home', { title: 'All users', users: result})
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
    
    } catch (err){
        next(err)
    }
    
}

module.exports = home 
