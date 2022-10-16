const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/product');

const { requireSignin, isAdmin } = require('../controllers/auth');

router.get('/product', requireSignin, isAdmin, getAllProducts);
router.post('/product', requireSignin, createProduct);
router.put('/product/:productId', requireSignin, updateProduct);
router.delete('/product/:productId', requireSignin, deleteProduct);
router.get('/product/:productId', getProductById);

module.exports = router;
