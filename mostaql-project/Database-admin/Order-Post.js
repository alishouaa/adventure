const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const OrderSchema = new Schema({

    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    product: [{

        type: {
            type: String
        },
        color: {
            type: String
        },
        name: {
            type: String
        },
        quantity: {
            type: String
        },
        unit_amount: {
            type: String
        },
    }],
    metadata: [{
        customer_name: {
            type: String
        },
        city: {
            type: String
        },
        adress: {
            type: String
        },
        phone: {
            type: Number
        },
        typeTransport: {
            type: String
        },
    }],
    created_at: {
        type: Date,
        default: Date.now
    },

})
const OrderPost = mongoose.model("OrderPost", OrderSchema)

exports.OrderPost = OrderPost