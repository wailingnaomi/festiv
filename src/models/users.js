//reference to mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//make schema
const userSchema = new Schema({
    first_name: { 
        type: String, 
        required: true
    },
    last_name: {
        type: String, 
        require: true
    },
    email: {
        type: String, 
        require: true, 
        unique: true
    },
    password: {
        type: String, 
        require: true
    },
    
    name: {
        type: String,
        // required: true
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

//create the model for the schema
const User = mongoose.model('User', userSchema)

//export model
module.exports = User;


    
    
   