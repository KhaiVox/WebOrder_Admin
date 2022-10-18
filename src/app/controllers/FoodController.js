// đây là lúc controller lấy dữ liệu từ models,
// dữ liệu vừa đc models lấy từ DB
const Food = require('../models/food')
const { mongooseToObject } = require('../../util/mongoose')
const { mutipleMongooseToObject } = require('../../util/mongoose')

// giới hạn số lượng item đc hiển thị trong 1 trang
const PAGE_SIZE = 5

var index = 1

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
            // Food.findOne
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
            res.render('foods', { index: index })
        }
    }

    // [GET] /foods/create
    create(req, res, next) {
        res.render('foods/create', { index: index })
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

    // [GET] /foods/:id/edit
    edit(req, res, next) {
        Food.findOne({ _id: req.params.id })
            .then((food) => {
                res.render('foods/edit', { food: mongooseToObject(food), index: index })
            })

        .catch(next)
    }

    // [PUT] /foods/:id
    update(req, res, next) {
        Food.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/foods'))
            .catch(next)
    }

    // [DELETE] /foods/:id
    softDelete(req, res, next) {
        // Food.delete là phương thức xóa mềm của thư viện "Mongoose Delete Plugin"
        Food.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] /foods/:id/force
    delete(req, res, next) {
        Food.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [GET] /foods/trash
    trash(req, res, next) {
        // findDeleted: render ra danh sách khóa học đã xóa
        Food.findDeleted({})
            .then((foods) =>
                res.render('foods/trash', {
                    foods: mutipleMongooseToObject(foods),
                    index: index,
                }),
            )
            .catch(next)
    }

    // [PATH] /foods/:id/restore
    restore(req, res, next) {
        Food.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new FoodController()