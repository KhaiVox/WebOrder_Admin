class SideBarController {
    // [GET] /sidebar
    index(req, res) {
        res.render('sidebar')
    }
}

module.exports = new SideBarController()