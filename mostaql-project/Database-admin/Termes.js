const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const TermesSchema = new Schema({

    terme: {
        type: String,
    },
    content: {
        type : String,
    },
    created_at: {
        type: Date,
        default: Date.now
    },

})
const Termes = mongoose.model("Termes", TermesSchema)

exports.Termes = Termes