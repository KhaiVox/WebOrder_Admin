const express = require('express')
const router = express.Router()

const userController = require('../../user/app/controllers/UserController')

router.get('/', userController.home)

module.exports = router
