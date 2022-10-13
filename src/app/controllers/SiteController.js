class SiteController {
    // [GET] /
    index(req, res, next) {
        res.render('home', { index: 0 })
    }
}

module.exports = new SiteController()