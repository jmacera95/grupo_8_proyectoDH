const express = require('express');
const router = express.Router();
const productAPIController = require('../../controllers/api/productAPIController');

router.get('/', productAPIController.getProducts);
router.get('/:id', productAPIController.getProduct);
router.get('/:id/image', productAPIController.getProductImage);
router.get('/vehicles_models/active', productAPIController.activeVehicleModelsList);

module.exports = router;