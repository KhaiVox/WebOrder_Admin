const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://ngocphuc:31KO3MAIXZoHVKaa@cluster0.jm3jwgm.mongodb.net/DevFood', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const Schema = mongoose.Schema

const History = new Schema(
    {
        total: { type: Number },
        detail_Product: { type: Array },
        createAt: { type: Date, default: Date.now },
    },
    {
        collection: 'history_purchase',
    },
)

const HistoryModel = mongoose.model('History', History)
module.exports = HistoryModel
