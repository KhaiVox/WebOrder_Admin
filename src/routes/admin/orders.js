const express = require('express')
const router = express.Router()

const orderController = require('../../admin/app/controllers/OrderController')

// router.get('/:slug', orderController.show)
router.put('/:id', orderController.updateState)
router.put('/:id/cancel', orderController.cancel)

// lọc đơn theo trạng thái
router.get('/:slug', orderController.filter)

router.get('/:id/detail', orderController.detail)
router.get('/', orderController.index)

module.exports = router
