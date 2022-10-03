var path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const port = 3001

// Body parse
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// JWT
var jwt = require('jsonwebtoken')

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

// Static file
app.use(express.static(path.join(__dirname, 'public')))
const AccountModel = require('./models/account')

// Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
    }),
)
app.set('views', path.join(__dirname, 'resources', 'views'))
app.set('view engine', 'hbs')

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

// Register
app.post('/user/register', (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    // console.log(username, password)
    AccountModel.findOne({
            username: username,
        })
        .then((data) => {
            if (data) {
                res.json('User này đã tồn tại!')
            } else {
                AccountModel.create({
                    username: username,
                    password: password,
                }).then((data) => {
                    res.json('Tạo tài khoản thành công!')
                })
            }
        })
        .catch((err) => {
            res.status(500).json('Tạo tài khoản thất bại!')
        })
})

// Login
app.post('/user/login', (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    AccountModel.findOne({
            username: username,
            password: password,
        })
        .then((data) => {
            if (data) {
                var token = jwt.sign({
                        _id: data._id,
                    },
                    'mk',
                )
                res.json({
                    message: 'Thành công',
                    token: token,
                })
            } else {
                res.json('Tài khoản hoặc mật khẩu chưa chính xác!')
            }
        })
        .catch((err) => {
            res.json('Đã xảy ra lỗi!')
        })
})

// Get login
// app.get(
//     '/user/login',
//     (req, res, next) => {
//         var token = req.cookies.token
//         var decodeToken = jwt.verify(token, 'mk')
//         AccountModel.find({ _id: decodeToken._id }).then((data) => {
//             if (data.length == 0) {
//                 res.sendFile(path.join(__dirname, 'login.html'))
//             } else {
//                 res.sendFile(path.join(__dirname, 'login.html'))
//             }
//         })
//     },
//     (req, res, next) => {
//         res.sendFile(path.join(__dirname, 'home.html'))
//     },
// )

// Nhận các route sau đó sử dụng (luôn để dưới cùng)
const route = require('./routes')
route(app)