const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const newsSchema = new Schema({
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
const News = mongoose.model("News", newsSchema)

exports.News = News