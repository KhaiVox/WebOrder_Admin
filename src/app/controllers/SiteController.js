const Food = require('../models/food')
const Voucher = require('../models/voucher')
const { mongooseToObject } = require('../../util/mongoose')
const { mutipleMongooseToObject } = require('../../util/mongoose')

var index = 0

class SiteController {
    // [GET] /home
    index(req, res, next) {
        Promise.all([Food.find(), Voucher.find()])
            .then(([products, vouchers]) => {
                res.render('home', {
                    index: index,
                    products: mutipleMongooseToObject(products),
                    vouchers: mutipleMongooseToObject(vouchers),
                })
            })
            .catch(next)
    }

    // [GET] /home/:slug
    filter(req, res, next) {
        Promise.all([Voucher.find(), Food.find({ type: req.params.slug })])
            .then(([vouchers, products]) => {
                res.render('home', {
                    index: index,
                    vouchers: mutipleMongooseToObject(vouchers),
                    products: mutipleMongooseToObject(products),
                })
            })
            .catch(next)
    }

    // [GET] /vouchers/create
    create(req, res, next) {
        res.render('vouchers/create', { index: index })
    }

    // [POST] /vouchers/store
    store(req, res, next) {
        // res.json(req.body)
        const voucher = new Voucher(req.body)

        voucher
            .save()
            .then(() => res.redirect('/home'))
            .catch(next)
    }

    // [DELETE] /vouchers/store/:id/force
    delete(req, res, next) {
        Voucher.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new SiteController()