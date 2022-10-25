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
        Promise.all([Food.countDocuments(), Food.find(), Food.countDocumentsDeleted()])
            .then(([quantity, foods, deletedCount]) => {
                res.render('foods', {
                    quantity,
                    index: index,
                    foods: mutipleMongooseToObject(foods),
                    deletedCount,
                })
            })
            .catch(next)
            // var page = req.query.page
            // if (page) {
            //     page = parseInt(page)

        //     if (page < 1) {
        //         page = 1
        //     }
        //     // bỏ qua bao nhiêu phần tử để đến trang mong muốn
        //     var skip = (page - 1) * PAGE_SIZE

        //     Promise.all([Food.countDocuments(), Food.find().skip(skip).limit(PAGE_SIZE), Food.countDocumentsDeleted()])
        //         .then(([pages, foods, deletedCount]) => {
        //             res.render('foods', {
        //                 pages,
        //                 index: index,
        //                 foods: mutipleMongooseToObject(foods),
        //                 deletedCount,
        //             })
        //         })

        //     .catch((err) => {
        //         res.json('Lỗi render')
        //     })
        // } else {
        //     Promise.all([Food.countDocuments(), Food.find().limit(PAGE_SIZE), Food.countDocumentsDeleted()])
        //         .then(([pages, foods, deletedCount]) => {
        //             res.render('foods', {
        //                 pages,
        //                 index: index,
        //                 foods: mutipleMongooseToObject(foods),
        //                 deletedCount,
        //             })
        //         })
        //         .catch(next)
        // }
    }

    // [GET] /foods/filter
    filter(req, res, next) {
        Promise.all([
            Food.find({ type: req.params.slug }).countDocuments(),
            Food.find({ type: req.params.slug }),
            Food.countDocumentsDeleted(),
        ]).then(([quantity, foods, deletedCount]) => {
            res.render('foods', {
                quantity,
                index: index,
                foods: mutipleMongooseToObject(foods),
                deletedCount,
            })
        })
    }

    // [GET] /foods/create
    create(req, res, next) {
        res.render('foods/create', { index: index })
    }

    // [POST] /foods/store
    store(req, res, next) {
        const food = new Food(req.body)

        food.save()
            // sau khi lưu thành công sẽ quay về trang chúng ta thiết lập bên dưới
            .then(() => res.redirect('/foods'))
            .catch(next)
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

    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'softDelete':
                // _id: { $in: req.body.food: lấy tất cả các id có trong list đã chọn này
                Food.delete({ _id: { $in: req.body.food } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            default:
                res.json({ message: 'Action is invalid!' })
        }
    }

    // [POST] /courses/handle-form-actions-trash
    handleFormActionsTrash(req, res, next) {
        switch (req.body.action) {
            case 'deleteAll':
                Food.deleteMany({ _id: { $in: req.body.trashIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            case 'restoreAll':
                Food.restore({ _id: { $in: req.body.trashIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            default:
                res.json({ message: 'Action is invalid!' })
        }
    }
}

module.exports = new FoodController()