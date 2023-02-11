const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://ngocphuc:31KO3MAIXZoHVKaa@cluster0.jm3jwgm.mongodb.net/DevFood', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const Schema = mongoose.Schema

const Order = new Schema(
    {
        id_Account: { type: String },
        detail_Cart: { type: Array },
        total: { type: Number },
        state: { type: Boolean },
        createAt: { type: Date, default: Date.now },
    },
    {
        collection: 'carts',
    },
)

const OrderModel = mongoose.model('Order', Order)
module.exports = OrderModel
