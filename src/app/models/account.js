const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://ngocphuc:ngocphuc@cluster0.jm3jwgm.mongodb.net/DevFood', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const Schema = mongoose.Schema

const AccountSchema = new Schema({
    username: String,
    password: String,
    role: String,
}, {
    collection: 'accounts',
}, )

const AccountModel = mongoose.model('account', AccountSchema)
module.exports = AccountModel