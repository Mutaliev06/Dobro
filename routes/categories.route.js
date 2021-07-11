const { Router } = require('express')
const { categoryControllers } = require('../controllers/categories.controller')

const router = Router()

router.get('/category', categoryControllers.getAllCategory)
router.post('/category', categoryControllers.createCategory)

module.exports = router