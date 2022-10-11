const { mutipleMongooseToObject } = require('../../util/mongoose')

// đây là lúc controller lấy dữ liệu từ models,
// dữ liệu vừa đc models lấy từ DB
const Food = require('../models/foods')

class SiteController {
    // [GET] /
    index(req, res, next) {
        res.render('home', { index: 0 })
    }

    // GET /foods
    foods(req, res, next) {
        // res.render('foods', { index: 1 })

        // Food.find({})
        //     .then((foods) =>
        //         res.render('foods', {
        //             title: 'Test title',
        //         }),
        //     )
        //     .catch(next)

        // Food.find({}, function(err, foods) {
        //     if (!err) {
        //         res.json(foods)
        //     } else {
        //         res.status(400).json({ error: 'ERROR ' })
        //     }
        // })

        Food.find({})
            .then((foods) =>
                res.render(
                    // 'foods', { index: 1 }, {
                    'foods', {
                        // map food bằng 1 hàm ở ngoài
                        // title: 'Test Title',
                        foods: mutipleMongooseToObject(foods),
                    },
                ),
            )
            .catch(next)
    }
}

module.exports = new SiteController()