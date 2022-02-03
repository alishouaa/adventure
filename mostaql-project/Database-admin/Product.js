const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const productSchema = new Schema({
    name: {
        type: String,
    },
    // avatar: {
    //     type: String,
    // },
    avatar: [{
        type: String,
    }],
    description: {
        type: String,
    },
    categorie: {
        type: String,
    },
    parCode: {
        type: String,
    },
    typeVehicle: {
        type: String,
    },
    typeVehicleTwo: {
        type: String,
    },
    price: {
        type: Number,
    },
    color: {
        type: String,
    },
    twoColor: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    },

})
const Product = mongoose.model("Product", productSchema)

exports.Product = Product