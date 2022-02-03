const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const TourPostSchema = new Schema({
    tourId: {
        type: Schema.Types.ObjectId,
        ref: 'Tour'
    },
    tour: [{
        date: {
            type: String,
        },
        ticket: {
            type: Number,
        },
        vehicle: {
            type: String,
        },
        clock: {
            type: String
        },
    }],

    metadata: [{
        customer_name: {
            type: String
        },
        email: {
            type: String
        },
        city: {
            type: String
        },
        phone: {
            type: Number
        },
    }],
    add: [{
        name: {
            type: String,
            required: true
        }
    }],
    price: {
        type: Number,
    },
    created_at: {
        type: Date,
        default: Date.now
    },

})
const TourPost = mongoose.model("TourPost", TourPostSchema)

exports.TourPost = TourPost