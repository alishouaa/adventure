const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const memberSchema = new Schema({

    avatar: {
        type: String,
    },
    name: {
        type : String,
    },
    content: {
        type : String,
    },
    created_at: {
        type: Date,
        default: Date.now
    },

})
const Member = mongoose.model("Member", memberSchema)

exports.Member = Member