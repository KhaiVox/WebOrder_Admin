const Order = require('../models/order')
const Customer = require('../models/customer')
const { mongooseToObject } = require('../../util/mongoose')
const { mutipleMongooseToObject } = require('../../util/mongoose')

var index = 2

class OrderController {
    // [GET] /orders
    async index(req, res, next) {
        const getOrders = await Order.find({})
        const getCartID = await (await Order.find({})).map((item) => item.id_Account)
        const getCustomers = await Customer.find({ _id: getCartID })
        const quantity = await Order.countDocuments()
            // res.json(getCustomers)
            // res.render('orders', { index: index })
            // Promise.all([Order.countDocuments(), Order.find()])
            //     .then(([quantity, orders]) => {
            //     })
            //     .catch(next)
        res.render('orders', {
            index: index,
            getOrders: mutipleMongooseToObject(getOrders),
            getCustomers: mutipleMongooseToObject(getCustomers),
            quantity,
        })
    }

    // [GET] /orders/:id/detail
    async detail(req, res, next) {
        const getOrder = await Order.findOne({ _id: req.params.id })
        const getCustomer = await Customer.findOne({ _id: getOrder.id_Account })
        const getProduct = await (await Order.findOne({ _id: req.params.id })).detail_Cart
        const getProductId = await getOrder.detail_Cart.map((item) => item.id_Food)

        // res.json(getProduct[0].quantity)
        // res.json(getProductId)
        // for (let i in getProduct) {
        //     console.log(getProduct[i])
        // }
        res.render('orders/detail', {
            index: index,
            getOrder: mongooseToObject(getOrder),
            getCustomer: mongooseToObject(getCustomer),
            getProduct: mongooseToObject(getProduct),
        })
    }
}

module.exports = new OrderController()