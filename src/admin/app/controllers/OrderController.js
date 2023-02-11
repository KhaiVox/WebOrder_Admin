const Order = require('../models/order')
const Customer = require('../models/customer')
const Food = require('../models/food')
const Payment = require('../models/payment')
const { mongooseToObject } = require('../../util/mongoose')
const { mutipleMongooseToObject } = require('../../util/mongoose')

var index = 2

class OrderController {
    // [GET] /orders
    async index(req, res, next) {
        const getPayment = await Payment.find({
            $or: [
                { order_Status: 'Chưa duyệt' },
                { order_Status: 'Đã duyệt' },
                { order_Status: 'Đang chuẩn bị' },
                { order_Status: 'Đang giao' },
            ],
        })

        const countAwait = await Payment.find({ order_Status: 'Chưa duyệt' }).countDocuments()
        const countDone = await Payment.find({ order_Status: 'Đã duyệt' }).countDocuments()
        const countReady = await Payment.find({ order_Status: 'Đang chuẩn bị' }).countDocuments()
        const countDelivery = await Payment.find({ order_Status: 'Đang giao' }).countDocuments()
        const quantity = countAwait + countDone + countReady + countDelivery

        res.render('orders', {
            index: index,
            getPayment: mutipleMongooseToObject(getPayment),
            countAwait,
            countDone,
            countReady,
            countDelivery,
            quantity,
        })
    }

    // [GET] /orders/:id/detail
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

        res.render('orders/detail', {
            index: index,
            getOrder: mongooseToObject(getOrder),
            getCart: mongooseToObject(getCart),
            getCustomer: mongooseToObject(getCustomer),
            getFood: mutipleMongooseToObject(listFood),
            getDetailCart,
        })
    }

    // [PUT] /orders/:id
    updateState(req, res, next) {
        Payment.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [PUT] /orders/:id
    cancel(req, res, next) {
        Payment.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/orders'))
            .catch(next)
    }

    // [GET] /orders/filter
    async filter(req, res, next) {
        const valueState = req.params
        if (valueState.slug == 'await') {
            valueState.slug = 'Chưa duyệt'
        }
        if (valueState.slug == 'done') {
            valueState.slug = 'Đã duyệt'
        }
        if (valueState.slug == 'ready') {
            valueState.slug = 'Đang chuẩn bị'
        }
        if (valueState.slug == 'delivery') {
            valueState.slug = 'Đang giao'
        }

        const countAwait = await Payment.find({ order_Status: 'Chưa duyệt' }).countDocuments()
        const countDone = await Payment.find({ order_Status: 'Đã duyệt' }).countDocuments()
        const countReady = await Payment.find({ order_Status: 'Đang chuẩn bị' }).countDocuments()
        const countDelivery = await Payment.find({ order_Status: 'Đang giao' }).countDocuments()
        const quantity = countAwait + countDone + countReady + countDelivery

        const orders = await Payment.find({ order_Status: valueState.slug })

        res.render('orders', {
            index: index,
            getPayment: mutipleMongooseToObject(orders),
            countAwait,
            countDone,
            countReady,
            countDelivery,
            quantity,
        })
    }
}

module.exports = new OrderController()
