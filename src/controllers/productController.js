const path = require('path');

const productController = {
    productList : (req, res) => {
        res.sendFile(path.join(__dirname, '../views/productList.html'));
    },
    productDetail : (req, res) => {
    res.sendFile(path.join(__dirname, '../views/productDetail.html'));
    }
}

module.exports = productController;
