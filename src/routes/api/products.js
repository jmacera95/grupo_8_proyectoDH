const express = require('express');
const router = express.Router();
const productController = require('../../controllers/api/productAPIController');

router.get('/vehicles_models/active', productController.activeVehicleModelsList);

module.exports = router;