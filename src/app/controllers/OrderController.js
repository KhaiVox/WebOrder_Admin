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
        const quantity = await Payment.countDocuments()
        const getPayment = await Payment.find({})

        res.render('orders', {
            index: index,
            quantity,
            getPayment: mutipleMongooseToObject(getPayment),
        })
    }

    // [GET] /orders/:id/detail
    async detail(req, res, next) {
        const getOrder = await Payment.findOne({ _id: req.params.id })
        const getCart = await Order.findOne({ _id: getOrder.id_Cart })
        const getCustomer = await Customer.findOne({ _id: getCart.id_Account })

        const getFoodId = await getCart.detail_Cart.map((item) => item.id_Food)
        const listFood = []
        for (let i of getFoodId) {
            let food = await Food.find({ _id: i })
            listFood.push(...food)
        }

        // const getDetailCart = await getCart.detail_Cart
        //     // const getDetailCartID = await (await getCart.detail_Cart).map((item) => item._id)

        // const desFood = await []
        // for (let i of getDetailCart) {
        //     // let food = await .find({ _id: i })
        //     desFood.push(i.quantity)
        //         // console.log(i)
        // }

        // res.json(desFood)
        // k được có await getCart.detail_Cart
        // phải là table Food.find({ _id: i }) mới đc
        // thêm bảng chi tiết đơn đặt

        res.render('orders/detail', {
            index: index,
            getOrder: mongooseToObject(getOrder),
            getCart: mongooseToObject(getCart),
            getCustomer: mongooseToObject(getCustomer),
            getFood: mutipleMongooseToObject(listFood),
            // getDesFood: mutipleMongooseToObject(desFood),
        })
    }

    // [PUT] /foods/:id
    updateState(req, res, next) {
        Payment.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('back'))
            .catch(next)
            // res.json(req.body)
    }
}

module.exports = new OrderController()