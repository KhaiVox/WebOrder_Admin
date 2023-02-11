const express = require('express')
const router = express.Router()

const siteController = require('../../admin/app/controllers/SiteController')

router.get('/', siteController.index)
router.post('/solve', siteController.solve)

// hiển thị view create và tạo mới khóa học
router.get('/vouchers/create', siteController.create)
router.post('/vouchers/store', siteController.store)
router.delete('/vouchers/:id/force', siteController.delete)

// lọc sản phẩm theo loại
router.get('/:slug', siteController.filter)

module.exports = router
