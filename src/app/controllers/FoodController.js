// đây là lúc controller lấy dữ liệu từ models,
// dữ liệu vừa đc models lấy từ DB
const Food = require('../models/food')
const { mongooseToObject } = require('../../util/mongoose')
const { mutipleMongooseToObject } = require('../../util/mongoose')

// giới hạn số lượng item đc hiển thị trong 1 trang
const PAGE_SIZE = 2

class FoodController {
    // [GET] /foods
    foods(req, res, next) {
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

    // [GET] /foods:slug
    show(req, res, next) {
        Food.findOne({ _id: req.params.id })
            .then((food) => {
                res.render('foods/show', { food: mongooseToObject(food) })
            })

        .catch(next)
    }

    // [GET] /foods/create
    create(req, res, next) {
        res.render('foods/create')
    }

    // [POST] /foods/store
    store(req, res, next) {
        // GÁN 1 GIÁ TRỊ BẤT KÌ ĐỂ TẠO ID CHO SẢN PHẨM ///
        // req.body.id = 12
        const food = new Food(req.body)

        // CÓ THỂ ÁP DỤNG CHO REGISTER VÀ RÀNG BUỘC AMIN Ở ĐÂY ///
        food.save()
            // sau khi lưu thành công sẽ quay về trang chúng ta thiết lập bên dưới
            .then(() => res.redirect('/foods'))
            .catch((error) => {})
    }
}

module.exports = new FoodController()