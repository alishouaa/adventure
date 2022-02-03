const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const codeSchema = new Schema({
    codeName: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },

})
const Code = mongoose.model("Code", codeSchema)

exports.Code = Code