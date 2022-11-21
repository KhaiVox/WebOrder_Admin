const express = require('express')
const router = express.Router()

const historyController = require('../app/controllers/HistoryController')

router.get('/:id/detail', historyController.detail)
router.put('/:id/cancel', historyController.cancel)

router.get('/', historyController.index)

module.exports = router