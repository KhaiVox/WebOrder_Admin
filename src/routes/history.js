const express = require('express')
const router = express.Router()

const historyController = require('../app/controllers/HistoryController')

router.get('/detailPurchase', historyController.detailPurchase)
router.get('/:id/detail', historyController.detail)
router.put('/:id/cancel', historyController.cancel)

router.get('/', historyController.index)

module.exports = router