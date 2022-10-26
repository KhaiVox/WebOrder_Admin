const express = require('express')
const router = express.Router()

const siteController = require('../app/controllers/SiteController')

// lọc sản phẩm theo loại
router.get('/:slug', siteController.filter)
router.get('/', siteController.index)

module.exports = router