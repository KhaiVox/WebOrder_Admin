const Order = require('../models/order')
const Customer = require('../models/customer')
const { mongooseToObject } = require('../../util/mongoose')
const { mutipleMongooseToObject } = require('../../util/mongoose')

var index = 2

class OrderController {
    // [GET] /orders
    async index(req, res, next) {
        const getOrder = await Order.find({})
        const getCartID = await (await Order.find({})).map((item) => item.id_Account)
        const getCustomer = await Customer.find({ _id: getCartID })
        const quantity = await Order.countDocuments()
            // res.json(getCustomer)
            // res.render('orders', { index: index })
            // Promise.all([Order.countDocuments(), Order.find()])
            //     .then(([quantity, orders]) => {
        res.render('orders', {
                quantity,
                index: index,
                getOrder: mutipleMongooseToObject(getOrder),
                getCustomer: mutipleMongooseToObject(getCustomer),
                quantity,
            })
            //     })
            //     .catch(next)
    }
}

module.exports = new OrderController()