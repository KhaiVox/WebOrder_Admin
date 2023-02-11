const express = require('express')
const router = express.Router()

const foodController = require('../../admin/app/controllers/FoodController')

// hiển thị view create và tạo mới món ăn
router.get('/create', foodController.create)
router.post('/store', foodController.store)

// nhận URL của món ăn và chỉnh sửa vs phương thức [PUT]
router.get('/:id/edit', foodController.edit)
router.put('/:id', foodController.update)
router.patch('/:id/restore', foodController.restore)

// xóa mềm và xóa vĩnh viễn
router.delete('/:id', foodController.softDelete)
router.delete('/:id/force', foodController.delete)

// form select option
router.post('/handle-form-actions', foodController.handleFormActions)
router.post('/handle-form-actions-trash', foodController.handleFormActionsTrash)

// render ra danh sách món ăn đã xóa
router.get('/trash', foodController.trash)

router.get('/search', foodController.search)
router.get('/', foodController.foods)

// lọc sản phẩm theo loại
router.get('/:slug', foodController.filter)

module.exports = router
