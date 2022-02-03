const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const lineSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    date: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },

})
const Line = mongoose.model("Line", lineSchema)

exports.Line = Line