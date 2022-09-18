const path = require('path');
const fs = require('fs');

function TraerProductosDestacados() {
    const productsFile = fs.readFileSync(path.join(__dirname, '../database/products.json'))
    const productos = JSON.parse(productsFile);
    return productos.filter(producto => producto.destacado);  
};

const mainController = {
    index : (req, res) => {
        const productos = TraerProductosDestacados();
        res.render('index', {productos: productos});
    }
}

module.exports = mainController;