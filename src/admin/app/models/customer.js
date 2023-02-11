const mongoose = require('mongoose')

// thư viện xóa mềm
const mongooseDelete = require('mongoose-delete')

mongoose.connect('mongodb+srv://ngocphuc:31KO3MAIXZoHVKaa@cluster0.jm3jwgm.mongodb.net/DevFood', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const Schema = mongoose.Schema

const Customer = new Schema(
    {
        fullname: { type: String },
        address: { type: String },
        phone: { type: String },
        email: { type: String },
        avatar: { type: String },
        point: { type: Number },
        quantity: { type: Number },
    },
    {
        collection: 'account_users',
    },
)

Customer.plugin(mongooseDelete, { overrideMethods: 'all' })

const CustomerModel = mongoose.model('Customer', Customer)
module.exports = CustomerModel
