class SiteController {
    // [GET] /
    index(req, res, next) {
        res.render('home', { index: 0 })
    }

    // GET /foods
    foods(req, res) {
        res.render('foods', { index: 1 })
    }
}

module.exports = new SiteController()