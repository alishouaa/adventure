const { boolean } = require('joi');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const addSchema = new Schema({
    name: {
        type: String,
    },
    price: {
        type: Number
    },
    type: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },

})
const Add = mongoose.model("Add", addSchema)

exports.Add = Add