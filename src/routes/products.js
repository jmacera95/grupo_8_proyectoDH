const path = require('path');
const express = require('express');
const multer = require('multer');
const resizeImagesMiddleware = require('../middlewares/resizeImagesMiddleware');
const router = express.Router();
const productController = require('../controllers/productController');
const userTypeMiddleware = require('../middlewares/userTypeMiddleware');
const { productsCreateValidations } = require('../validations/productsValidations');

const storage = multer.memoryStorage();
const uploadFile = multer({ storage });

router.get('/', productController.productList);

router.get('/product-detail/:id', productController.productDetail);

router.get('/create', userTypeMiddleware, productController.create);
router.post('/create', uploadFile.single('img'), productsCreateValidations, productController.saveNewProduct);

router.get('/edit/:id', userTypeMiddleware, productController.editar);
router.put('/edit/:id', uploadFile.single('img'), resizeImagesMiddleware, productController.actualizar);
router.delete('/delete/:id', productController.delete);

module.exports = router;