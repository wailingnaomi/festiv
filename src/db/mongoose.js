const mongoose = require('mongoose')
require('dotenv').config()

//met database connecten
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then((result) => console.log('connected to db'))
.catch((err) => console.log(err))

