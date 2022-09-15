const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.productList);

router.get('/product-detail/:id', productController.productDetail);

router.get('/create', productController.create);
router.post('/create', productController.saveNewProduct);

router.get('/edit/:id', productController.editar);
router.put('/edit/:id', productController.actualizar);

module.exports = router;