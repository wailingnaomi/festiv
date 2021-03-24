const mongoose = require = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true},
    last_name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true}
}, {collection: 'users'})

const model = mongoose.model('userSchema', userSchema)

module.exports = model