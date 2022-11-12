const express = require('express')
const router = express.Router()

const orderController = require('../app/controllers/OrderController')

// router.get('/:slug', orderController.show)
// router.get('/:id/detail', orderController.detail)
router.get('/', orderController.index)

module.exports = router