const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/productList.html'));
});

router.get('/product-detail', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/productDetail.html'));
});

module.exports = router;