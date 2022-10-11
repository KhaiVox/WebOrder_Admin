const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/account', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const Schema = mongoose.Schema

const Food = new Schema({
    id: String,
    name: { type: String, required: true },
    img: { type: String },
    type: { type: String },
    price: { type: String },
})

const FoodModel = mongoose.model('Food', Food)
module.exports = FoodModel