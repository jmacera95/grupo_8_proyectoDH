const express = require('express');
const multerProductsMiddleware = require('../middlewares/multerProductsMiddleware');
const resizeImagesMiddleware = require('../middlewares/resizeImagesMiddleware');
const router = express.Router();
const productController = require('../controllers/productController');
const userTypeMiddleware = require('../middlewares/userTypeMiddleware');
const { productsCreateValidations, productsEditValidations } = require('../validations/productsValidations');

router.get('/', productController.productList);
router.get('/product-detail/:id', productController.productDetail);
router.get('/create', userTypeMiddleware, productController.create);
router.post('/create', multerProductsMiddleware.single('img'), resizeImagesMiddleware, productsCreateValidations, productController.saveNewProduct);
router.get('/edit/:id', userTypeMiddleware, productController.editar);
router.put('/edit/:id', multerProductsMiddleware.single('img'), resizeImagesMiddleware, productsEditValidations, productController.actualizar);
router.delete('/delete/:id', productController.delete);
router.post('/:id/add_to_cart', productController.addToCart);
router.get('/cart', productController.getCart);
router.post('/:id/remove_from_cart', productController.removeFromCart);

module.exports = router;