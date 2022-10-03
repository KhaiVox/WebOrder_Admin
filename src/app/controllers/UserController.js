class UserController {
    // [GET] /login
    login(req, res, next) {
        res.render('login')
    }

    // [GET] /register
    register(req, res, next) {
        res.render('register')
    }

    // // [POST] /register
    // reg(req, res, next) {
    //     var username = req.body.username
    //     var password = req.body.password

    //     // console.log(username, password)
    //     AccountModel.findOne({
    //             username: username,
    //         })
    //         .then((data) => {
    //             if (data) {
    //                 res.json('User này đã tồn tại!')
    //             } else {
    //                 AccountModel.create({
    //                     username: username,
    //                     password: password,
    //                 }).then((data) => {
    //                     res.json('Tạo tài khoản thành công!')
    //                 })
    //             }
    //         })
    //         .catch((err) => {
    //             res.status(500).json('Tạo tài khoản thất bại!')
    //         })
    // }
}

module.exports = new UserController()