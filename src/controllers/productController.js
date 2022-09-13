const path = require('path');
const fs = require('fs');

const productsFile = fs.readFileSync(path.join(__dirname, '../database/products.json'))
const productos = JSON.parse(productsFile);

const productController = {
    productList : (req, res) => {
        res.render('productList', {productos: productos});
    },
    productDetail : (req, res) => {
        const producto = productos.filter(producto => producto.id == req.params.id)[0];
        res.render('productDetail', {producto: producto});
    },
    create : (req, res) => {
        res.render('productCreate'); 
    },
    saveNewProduct: (req, res) => {
        console.log(1);
    },
    edit : (req, res) => {
        const productoAEditar = productos.filter(producto => producto.id == req.params.id)[0];
        res.render('productEdit', {producto: productoAEditar});
    }
}

module.exports = productController;
