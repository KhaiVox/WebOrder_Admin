const Order = require('../models/order')
const Customer = require('../models/customer')
const Food = require('../models/food')
const Payment = require('../models/payment')
const { mongooseToObject } = require('../../util/mongoose')
const { mutipleMongooseToObject } = require('../../util/mongoose')

var index = 3

class HistoryController {
    // [GET] /history
    async index(req, res, next) {
        const getPayment = await Payment.find({ $or: [{ order_Status: 'Hoàn tất' }, { order_Status: 'Đã hủy' }] })
        const quantitySuccess = await Payment.countDocuments({ order_Status: 'Hoàn tất' })
        const quantityCancel = await Payment.countDocuments({ order_Status: 'Đã hủy' })
        const quantity = quantitySuccess + quantityCancel
        const getPaymentSuccess = await Payment.find({ order_Status: 'Hoàn tất' })
        let totalRevenue = 0

        getPaymentSuccess.map((item) => {
            totalRevenue += item.total
        })

        res.render('history', {
            index: index,
            quantity,
            getPayment: mutipleMongooseToObject(getPayment),
            totalRevenue,
        })
    }

    // [GET] /history/:id/detail
    async detail(req, res, next) {
        const getOrder = await Payment.findOne({ _id: req.params.id })
        const getCartID = getOrder.id_Cart
        const getCart = await Order.findOne({ _id: getCartID })
        const getCustomerID = getCart.id_Account
        const getCustomer = await Customer.findOne({ _id: getCustomerID })

        const getDetailCart = getCart.detail_Cart
        const getFoodId = getDetailCart.map((item) => item.id_Food)
        const listFood = []
        for (let i of getFoodId) {
            let food = await Food.find({ _id: i })
            listFood.push(...food)
        }

        res.render('historys/detail', {
            index: index,
            getOrder: mongooseToObject(getOrder),
            getCart: mongooseToObject(getCart),
            getCustomer: mongooseToObject(getCustomer),
            getFood: mutipleMongooseToObject(listFood),
            getDetailCart,
        })
    }

    // [PUT] /orders/:id
    cancel(req, res, next) {
        Payment.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/orders'))
            .catch(next)
    }
}

module.exports = new HistoryController()