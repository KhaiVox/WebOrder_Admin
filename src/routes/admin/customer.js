const express = require('express')
const router = express.Router()

const customerController = require('../../admin/app/controllers/CustomerController')

router.delete('/:id', customerController.softDelete)
router.get('/trash', customerController.trash)
router.patch('/:id/restore', customerController.restore)
router.get('/', customerController.index)

module.exports = router
