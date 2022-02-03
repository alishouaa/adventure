const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const homeSchema = new Schema({
    avatar: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },

})
const Home = mongoose.model("Home", homeSchema)

exports.Home = Home