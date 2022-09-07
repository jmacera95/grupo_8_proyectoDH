const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.productList);

router.get('/product-detail',productController.productDetail);

module.exports = router;