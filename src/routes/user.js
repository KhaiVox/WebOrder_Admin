const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/UserController')

router.get('/login', userController.login)
router.get('/register', userController.register)
    // router.post('/singin', userController.singin)

module.exports = router