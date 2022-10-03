const express = require('express')
const router = express.Router()

const sidebarController = require('../app/controllers/SideBarController')

router.get('/', sidebarController.index)

module.exports = router