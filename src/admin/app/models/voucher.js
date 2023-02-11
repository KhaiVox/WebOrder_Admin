const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://ngocphuc:31KO3MAIXZoHVKaa@cluster0.jm3jwgm.mongodb.net/DevFood', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const Schema = mongoose.Schema

const Voucher = new Schema(
    {
        name: { type: Number },
        discount: { type: Number },
        minprice: { type: Number },
        special: { type: Boolean },
        point: { type: Number },
        createAt: { type: Date, default: Date.now },
    },
    {
        collection: 'vouchers',
    },
)

const VoucherModel = mongoose.model('Voucher', Voucher)
module.exports = VoucherModel
