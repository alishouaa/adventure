const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const dateSchema = new Schema({
    dateFirst: {
        type: String,
    },
    dateLast : {
        type:String,
    },
    created_at: {
        type: Date,
        default: Date.now
    },

})
const DateOff = mongoose.model("DateOff", dateSchema)

exports.DateOff = DateOff