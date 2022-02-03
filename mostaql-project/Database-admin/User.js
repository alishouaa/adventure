const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    isAdmin : {
        type:Boolean
    },
    phone : {
        type:String
    },
    created_at: {
        type: Date,
        default: Date.now
    }

})
const User = mongoose.model("User", userSchema)

exports.User = User
