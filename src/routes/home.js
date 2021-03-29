const User = require ('../models/users');
const email = require ('./register')

async function home (req, res, next) {
    try{

        const loggedIn = await User.findOne({
           email: 'test@tester.com'
        })

        // console.log(email)
        console.log('i am logged in as ' + loggedIn)

        const allUsers = await User.find({
            $and: [{
                email: {
                    // this operate won't let the logged in user appear in the homepage
                  $ne: loggedIn.email,
                },
              },
              ],
        
        })

        console.log('all users ' + allUsers)

        res.render('home', {
            title: 'All users',
            users: allUsers
        })
    
    } catch (err){
        next(err)
    }
    
}

module.exports = home 
