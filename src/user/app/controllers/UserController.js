class UserController {
    // [GET] /client
    home(req, res, next) {
        // res.json('Page')
        res.render('layouts/main')
    }
}

module.exports = new UserController()
