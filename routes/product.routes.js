const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/product');

const { requireSignin } = require('../controllers/auth')

router.get('/product', getAllProducts);
router.post('/product', requireSignin, createProduct);
router.put('/product/:productId',requireSignin, updateProduct);
router.delete('/product/:productId',requireSignin, deleteProduct);
router.get('/product/:productId', getProductById);

module.exports = router;

