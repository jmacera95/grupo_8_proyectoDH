const path = require('path');
const express = require('express');
const multer = require('multer');
const resizeImagesMiddleware = require('../middlewares/resizeImagesMiddleware');
const router = express.Router();
const productController = require('../controllers/productController');
const userTypeMiddleware = require('../middlewares/userTypeMiddleware');
const { productsCreateValidations } = require('../validations/productsValidations');

const storage = multer.memoryStorage();
function fileFilter(req, file, cb) {
    const acceptedFileExtensions = [".jpg", ".png", ".jpeg"];
    const isAccepted = acceptedFileExtensions.includes(path.extname(file.originalname));
    if (!isAccepted) {
        req.file = file;
    }
    cb(null, isAccepted);
}
const uploadFile = multer({ storage: storage, fileFilter: fileFilter });

router.get('/', productController.productList);

router.get('/product-detail/:id', productController.productDetail);

router.get('/create', userTypeMiddleware, productController.create);
router.post('/create', uploadFile.single('img'), resizeImagesMiddleware, productsCreateValidations, productController.saveNewProduct);

router.get('/edit/:id', userTypeMiddleware, productController.editar);
router.put('/edit/:id', uploadFile.single('img'), resizeImagesMiddleware, productController.actualizar);
router.delete('/delete/:id', productController.delete);

module.exports = router;