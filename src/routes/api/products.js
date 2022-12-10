const express = require('express');
const router = express.Router();
const productAPIController = require('../../controllers/api/productAPIController');

router.get('/', productAPIController.productList);
router.get('/vehicles_models/active', productAPIController.activeVehicleModelsList);

module.exports = router;