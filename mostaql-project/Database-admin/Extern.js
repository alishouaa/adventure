const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const externSchema = new Schema({

    tax: {
        type: Number,
    },
    coboneName: {
        type : String,
    },
    cobonePourcent : {
        type:Number
    },
    created_at: {
        type: Date,
        default: Date.now
    },

})
const Extern = mongoose.model("Extern", externSchema)

exports.Extern = Extern