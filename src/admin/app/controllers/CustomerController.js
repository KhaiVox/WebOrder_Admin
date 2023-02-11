const Customer = require('../models/customer')
const Payment = require('../models/payment')
const Order = require('../models/order')

const { mutipleMongooseToObject } = require('../../util/mongoose')

var index = 4

class CustomerController {
    // [GET] /customer
    async index(req, res, next) {
        const getCartID = await (await Payment.find({ order_Status: 'Hoàn tất' })).map((item) => item.id_Cart)
        // const cart = await (await Payment.find({})).map((item) => item.id_Cart)
        const getUserID = await (await Order.find({ _id: getCartID })).map((item) => item.id_Account)
        const getCustomer = await Customer.find({ _id: getUserID })
        const quantity = getCustomer.length

        let newArr = []

        // Tạo hàm đếm số lần xuất hiện của một phần tử trong mảng JavaScript
        function countElement(getUserID, x) {
            let count = 0
            for (let i = 0; i < getUserID.length; i++) {
                if (getUserID[i] == x) count++
            }
            newArr.push(count)
        }

        // Xóa phần tử trùng nhau và lấy các phần tử duy nhất
        let arrSingle = getUserID.reduce(function (listItem, item) {
            if (listItem.indexOf(item) === -1) {
                listItem.push(item)
            }
            return listItem
        }, [])

        // Đếm số lần xuất hiện của các phần tử duy nhất
        for (let i = 0; i < arrSingle.length; i++) {
            countElement(getUserID, arrSingle[i])
        }

        getCustomer.forEach((ele, index) => {
            ele['quantity'] = newArr[index]
        })

        // res.json(getUser)

        res.render('customer', {
            quantity,
            index: index,
            getCustomer: mutipleMongooseToObject(getCustomer),
        })
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
}

module.exports = new CustomerController()
