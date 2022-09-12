const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.productList);

router.get('/product-detail/:id',productController.productDetail);

module.exports = router;