const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const emailSchema = new Schema({
    email: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },

})
const Email = mongoose.model("Email", emailSchema)

exports.Email = Email