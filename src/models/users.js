const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//make schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    age: {
        type: String,
        required: true
    },

    bio:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    }

}, {timestamps: true});

//structure of schema
const User = mongoose.model('User', userSchema)

module.exports = User;