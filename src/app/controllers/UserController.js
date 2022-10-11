class UserController {
    // [GET] /login
    login(req, res, next) {
        res.render('login')
    }

    // [GET] /register
    register(req, res, next) {
        res.render('register')
    }
}

module.exports = new UserController()