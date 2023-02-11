const Food = require('../models/food')
const Voucher = require('../models/voucher')

const History = require('../models/history')
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

    // [POST] /home/solve
    solve(req, res, next) {
        let img = req.body.img
        let name = req.body.name
        let quantity = req.body.quantity
        let price = req.body.price
        let total = req.body.total
        let paymentTotal = req.body.paymentTotal

        // tạo mảng object với mỗi object là 1 tên sản phẩm
        let productArray = []
        for (let i = 0; i < name.length; i++) {
            productArray.push({ name: name[i] })
        }

        // lặp qua từng object và thêm những trường còn lại
        productArray.forEach((ele, index) => {
            ele['img'] = img[index]
            ele['quantity'] = quantity[index]
            ele['price'] = price[index]
            ele['total'] = total[index]
        })

        History.create({
            total: paymentTotal,
            detail_Product: productArray,
        })
            .then(() => res.redirect('/home'))
            .catch(next)
    }
}

module.exports = new SiteController()
