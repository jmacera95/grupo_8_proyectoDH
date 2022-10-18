const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const productController = require('../controllers/productController');
const userTypeMiddleware = require('../middlewares/userTypeMiddleware');

const storage = multer.diskStorage(
    {
        destination: (req, file, callback) => {
            callback(null, path.join(__dirname, '../../public/images/products'));
        },
        filename: (req, file, callback) => {
            callback(null, `${Date.now()}_${file.originalname}`); // TODO: verificar si este nombre nos sirve o si deberíamos customizarlo más.
        }
    }
);
const uploadFile = multer({ storage });
router.get('/', productController.productList);

router.get('/product-detail/:id', productController.productDetail);

router.get('/create', userTypeMiddleware, productController.create);
router.post('/create', uploadFile.single('img'), productController.saveNewProduct);

router.get('/edit/:id', userTypeMiddleware, productController.editar);
router.put('/edit/:id', uploadFile.single('img'), productController.actualizar);
router.delete('/delete/:id', productController.delete);

module.exports = router;