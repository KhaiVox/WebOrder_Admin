const { mutipleMongooseToObject } = require('../../util/mongoose')

// đây là lúc controller lấy dữ liệu từ models,
// dữ liệu vừa đc models lấy từ DB
const Food = require('../models/food')

// giới hạn số lượng item đc hiển thị trong 1 trang
const PAGE_SIZE = 2

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
        //             // map food bằng 1 hàm ở ngoài
        //             foods: mutipleMongooseToObject(foods),
        //         }),
        //     )
        //     .catch(next)
        var page = req.query.page

        if (page) {
            page = parseInt(page)
                // bỏ qua bao nhiêu phần tử để đến trang mong muốn
            var skip = (page - 1) * PAGE_SIZE
            if (page < 1) {
                page = 1
            }
            Food.find({})
                .skip(skip)
                .limit(PAGE_SIZE)
                .then((data) => {
                    Food.countDocuments({}).then((total) => {
                        // đếm số trang để phục vụ cho render list html và chức năng prev/next
                        var totalPage = Math.ceil(total / PAGE_SIZE)
                        res.json({ total, totalPage, data })
                    })
                })
                .catch((err) => {
                    res.json('Lỗi render')
                })
        } else {
            res.render('foods', { index: 1 })
        }
    }
}

module.exports = new SiteController()