const AccountModel = require('../models/account')
var jwt = require('jsonwebtoken')

class AuthController {
    // [GET] /login
    login(req, res, next) {
        res.render('login')
    }

    // [GET] /register
    register(req, res, next) {
        res.render('register')
    }

    // [POST] /login
    // singin(req, res, next) {
    //     // res.json(req.body)
    //     var username = req.body.username
    //     var password = req.body.password

    //     AccountModel.findOne({
    //             username: username,
    //             password: password,
    //         })
    //         .then((data) => {
    //             if (data) {
    //                 var token = jwt.sign({
    //                         _id: data._id,
    //                         admin: true,
    //                     },
    //                     'mk',
    //                 )
    //                 res.json({
    //                     message: 'Thành công',
    //                     token: token,
    //                 })
    //                 res.redirect('/')
    //             } else {
    //                 res.json('Tài khoản hoặc mật khẩu chưa chính xác!')
    //             }
    //         })
    //         .catch((err) => {
    //             res.json('Đã xảy ra lỗi!')
    //         })
    // }
}

module.exports = new AuthController()
