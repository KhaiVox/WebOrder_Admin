const express = require('express')
const router = express.Router()

const foodController = require('../app/controllers/FoodController')

router.get('/create', foodController.create)
router.post('/store', foodController.store)
router.get('/:id', foodController.show)
router.get('/', foodController.foods)

module.exports = router