class CustomerController {
    // [GET] /customer
    customer(req, res, next) {
        res.render('customer', { index: 5 })
    }
}

module.exports = new CustomerController()