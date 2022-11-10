var index = 3

class HistoryController {
    // [GET] /history
    index(req, res, next) {
        res.render('history', { index: index })
    }
}

module.exports = new HistoryController()