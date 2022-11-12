const Customer = require('../models/customer')
const { mongooseToObject } = require('../../util/mongoose')
const { mutipleMongooseToObject } = require('../../util/mongoose')

const PAGE_SIZE = 5
var index = 5

class CustomerController {
    // [GET] /customer
    customer(req, res, next) {
        Promise.all([Customer.countDocuments(), Customer.find(), Customer.countDocumentsDeleted()])
            .then(([quantity, customers, deletedCount]) => {
                res.render('customer', {
                    quantity,
                    index: index,
                    customers: mutipleMongooseToObject(customers),
                    deletedCount,
                })
            })
            .catch(next)
    }

    // [DELETE] /customer/:id
    softDelete(req, res, next) {
        Customer.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [GET] /customer/trash
    trash(req, res, next) {
        Promise.all([Customer.countDocuments(), Customer.findDeleted(), Customer.countDocumentsDeleted()])
            .then(([quantity, customers, deletedCount]) => {
                res.render('customer/trash', {
                    quantity,
                    index: index,
                    customers: mutipleMongooseToObject(customers),
                    deletedCount,
                })
            })
            .catch(next)
    }

    // [PATH] /customer/:id/restore
    restore(req, res, next) {
        Customer.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [GET] /customer/search
    search(req, res, next) {
        const textSearch = req.query.text

        // res.json(textSearch)

        Promise.all([
                Customer.countDocuments(),
                Customer.find({ fullname: { $regex: textSearch } }),
                Customer.countDocumentsDeleted(),
            ])
            .then(([quantity, customers, deletedCount]) => {
                res.render('customer', {
                    quantity,
                    index: index,
                    customers: mutipleMongooseToObject(customers),
                    deletedCount,
                })
            })
            .catch(next)
    }
}

module.exports = new CustomerController()