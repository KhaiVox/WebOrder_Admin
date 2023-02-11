const mongoose = require('mongoose')

// thư viện xóa mềm
const mongooseDelete = require('mongoose-delete')

mongoose.connect('mongodb+srv://ngocphuc:31KO3MAIXZoHVKaa@cluster0.jm3jwgm.mongodb.net/DevFood', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const Schema = mongoose.Schema

const Food = new Schema(
    {
        id: String,
        name: { type: String, required: true },
        img: { type: String },
        type: { type: String },
        price: { type: String },
    },
    {
        collection: 'foods',
    },
)

// deleteAt: tự động thêm thời gian xóa
// overrideMethods: ẩn những item đã được xóa mềm
Food.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' })

const FoodModel = mongoose.model('Food', Food)
module.exports = FoodModel
