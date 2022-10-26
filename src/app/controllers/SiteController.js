const Food = require('../models/food')
const { mongooseToObject } = require('../../util/mongoose')
const { mutipleMongooseToObject } = require('../../util/mongoose')

var index = 0

class SiteController {
    // [GET] /home
    index(req, res, next) {
        Food.find({})
            .then((products) =>
                res.render('home', {
                    products: mutipleMongooseToObject(products),
                    index: index,
                }),
            )
            .catch(next)
    }

    // [GET] /home/:slug
    filter(req, res, next) {
        Food.find({ type: req.params.slug })
            .then((products) =>
                res.render('home', {
                    products: mutipleMongooseToObject(products),
                    index: index,
                }),
            )
            .catch(next)
    }
}

module.exports = new SiteController()