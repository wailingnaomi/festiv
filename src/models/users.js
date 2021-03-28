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
    
    age: {
        type: String,
        
    },

    bio:{
        type: String,
        
    },
    img:{
        type: String,
        
    },
    genre:{
        type: String,
        
    },
    
    liked: [
        {
            type: String,
        }
    ],

    disliked: [
        {
            type: String
        }
    ]

}, {timestamps: true});

//create the model for the schema
const User = mongoose.model('User', userSchema)

//export model
module.exports = User;


    
    
   