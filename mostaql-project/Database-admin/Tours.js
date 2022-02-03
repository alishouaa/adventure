const { boolean } = require('joi');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const tourSchema = new Schema({
    title: {
        type: String,
    },
    type: {
        type: String,
    },
    avatar: {
        type: String,
    },
    video: {
        type: String,
    },
    time: {
        type: String,
    },
    city: {
        type: String,
    },
    info: {
        type: String
    },
    ifReserve: {
        type: String
    },
    instruction: {
        type: String
    },
    map: {
        type: String
    },
    people: {
        type: Number
    },
    priceAtv: {
        type: Number
    },
    priceUtv: {
        type: Number
    },
    add : [{
        name : String,
        price : Number
    }],
    created_at: {
        type: Date,
        default: Date.now
    },

})
const Tour = mongoose.model("Tour", tourSchema)

exports.Tour = Tour