class NewsController {
    // [GET] /orders
    index(req, res) {
        res.render('orders', { index: 2 })
    }

    // [GET] /orders:slug
    show(req, res) {
        res.json('news slug')
    }
}

module.exports = new NewsController()