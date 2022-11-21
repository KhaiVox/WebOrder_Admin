const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://ngocphuc:ngocphuc@cluster0.jm3jwgm.mongodb.net/DevFood', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const Schema = mongoose.Schema

const Payment = new Schema({
    id_Cart: { type: String },
    payment_Method: { type: String },
    receive_Method: { type: Array },
    confirm_Order: { type: String },
    order_Status: { type: String },
    // point: { type: Boolean },
    createAt: { type: Date },
}, {
    collection: 'payments',
}, )

const PaymentModel = mongoose.model('Payment', Payment)
module.exports = PaymentModel