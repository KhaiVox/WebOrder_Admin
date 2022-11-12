const express = require('express')
const router = express.Router()

const customerController = require('../app/controllers/CustomerController')

router.delete('/:id', customerController.softDelete)

router.get('/trash', customerController.trash)
router.patch('/:id/restore', customerController.restore)

router.get('/search', customerController.search)

router.get('/', customerController.customer)

module.exports = router