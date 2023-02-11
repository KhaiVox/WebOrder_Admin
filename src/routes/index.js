// Admin
const authRouter = require('./admin/auth')
const ordersRouter = require('./admin/orders')
const siteRouter = require('./admin/site')
const foodRouter = require('./admin/foods')
const historyRouter = require('./admin/history')
const customerRouter = require('./admin/customer')

// User
const userRouter = require('./user/home')

// nếu các tuyến đường bên trên ko match -> chạy tuyến đường bên dưới cùng
function route(app) {
    // admin
    app.use('/auth', authRouter)
    app.use('/customer', customerRouter)
    app.use('/orders', ordersRouter)
    app.use('/foods', foodRouter)
    app.use('/history', historyRouter)
    app.use('/home', siteRouter)

    // user
    app.use('/user', userRouter)
}

module.exports = route
