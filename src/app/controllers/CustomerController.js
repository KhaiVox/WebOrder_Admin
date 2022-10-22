const Customer = require('../models/customer')
const { mongooseToObject } = require('../../util/mongoose')
const { mutipleMongooseToObject } = require('../../util/mongoose')

const PAGE_SIZE = 5
var index = 5

class CustomerController {
    // [GET] /customer
    customer(req, res, next) {
        Customer.find({})
            .then((customer) =>
                res.render('customer', {
                    customer: mutipleMongooseToObject(customer),
                    index: index,
                }),
            )
            .catch(next)
    }
}

module.exports = new CustomerController()