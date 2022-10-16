const express = require('express')
const router = express.Router()

const {getCategories, createCategory, updateCategory, deleteCategory, getCategoryById } = require('../controllers/categoryController')
const {isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/categories').get(getCategories)
router.route('/category/new').post(isAuthenticatedUser, authorizeRoles('admin'), createCategory)
router.route('/category/:id').get(getCategoryById)
router.route('/category/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateCategory)
router.route('/category/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCategory)

module.exports = router
