const Order = require('../models/order')
const Customer = require('../models/customer')
const Food = require('../models/food')
const Payment = require('../models/payment')
const History = require('../models/history')
const { mongooseToObject } = require('../../util/mongoose')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { response } = require('express')

var index = 3

class HistoryController {
    // [GET] /history
    async index(req, res, next) {
        // Order Online
        const getPayment = await Payment.find({ $or: [{ order_Status: 'Hoàn tất' }, { order_Status: 'Đã hủy' }] })
        const getPaymentSuccess = await Payment.find({ order_Status: 'Hoàn tất' })
        let totalRevenue = 0

        getPaymentSuccess.map((item) => {
            totalRevenue += item.total
        })

        // Order Purchase
        const getHistory = await History.find({})
        let totalRevenuePurchase = 0
        let getDetailProduct = getHistory[0].detail_Product

        getHistory.map((item) => {
            totalRevenuePurchase += item.total
        })

        res.render('history', {
            index: index,
            getPayment: mutipleMongooseToObject(getPayment),
            totalRevenue,
            getHistory: mutipleMongooseToObject(getHistory),
            totalRevenuePurchase,
            getDetailProduct,
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

    // [PUT] /history/:id
    cancel(req, res, next) {
        Payment.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/orders'))
            .catch(next)
    }

    // [GET] /history/detailPurchase
    async detailPurchase(req, res, next) {
        const getHistory = await History.find({})
        res.json(getHistory)
    }
}

module.exports = new HistoryController()
