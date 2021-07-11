const { Router } = require('express')
const { categoryControllers } = require('../controllers/categories.controller')

const router = Router()

router.get('/', categoryControllers.getAllCategory)
router.post('/', categoryControllers.createCategory)

module.exports = router