const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const opinionSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
     city: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    evaluate: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    },

})
const OpinionUser = mongoose.model("OpinionUser", opinionSchema)

exports.OpinionUser = OpinionUser