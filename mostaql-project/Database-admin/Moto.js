const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const motoSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    avatar: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },

})
const Moto = mongoose.model("Moto", motoSchema)

exports.Moto = Moto