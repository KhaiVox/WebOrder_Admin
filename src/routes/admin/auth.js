const express = require('express')
const router = express.Router()

const authController = require('../../admin/app/controllers/AuthController')

router.get('/login', authController.login)
router.get('/register', authController.register)

module.exports = router
