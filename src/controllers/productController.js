const path = require('path');
const fs = require('fs');

function TraerProductos() {
    const productsFile = fs.readFileSync(path.join(__dirname, '../database/products.json'))
    const productos = JSON.parse(productsFile);
    return productos      
};

function writeFile(productos) {
    const productosString = JSON.stringify(productos,null,19);
    fs.writeFileSync(path.join(__dirname,"../database/products.json"),productosString)
}



const productController = {
    productList : (req, res) => {
        const productos = TraerProductos();
        res.render('productList', {productos: productos});
    },
    productDetail : (req, res) => {
        const productos = TraerProductos();
        const producto = productos.filter(producto => producto.id == req.params.id)[0];
        res.render('productDetail', {producto: producto});
    },
    create : (req, res) => {
        res.render('productCreate'); 
    },
    saveNewProduct: (req, res) => {
        console.log(1);
    },
    editar : (req, res) => {
        const productos = TraerProductos();
        const productoAEditar = productos.filter(producto => producto.id == req.params.id)[0];
        res.render('productEdit', {producto: productoAEditar});
    },
    actualizar : (req,res) => {
        const productos = TraerProductos();
        const productoAEditar = productos.find(function(producto){
            return producto.id == req.params.id;            
        });

        productoAEditar.marca = req.body.marca ;
        productoAEditar.modelo = req.body.modelo ;
        productoAEditar.anio = req.body.anio ;
        productoAEditar.kilometraje = req.body.kilometraje ;
        productoAEditar.provincia = req.body.provincia ;
        productoAEditar.localidad = req.body.localidad ;
        productoAEditar.precio = req.body.precio ;
        productoAEditar.combustible = req.body.combustible ;
        productoAEditar.transmision = req.body.transmision ;
        productoAEditar.camtidadDueños = req.body.camtidadDueños ;
        productoAEditar.fechaService = req.body.fechaService ;
        productoAEditar.embrague = req.body.embrague ;
        productoAEditar.antiguedadCorrea = req.body.antiguedadCorrea ;
        productoAEditar.alineacionBalanceo = req.body.alineacionBalanceo ;
        productoAEditar.cantidadPuertas = req.body.cantidadPuertas ;
        productoAEditar.abs = req.body.abs ;
        productoAEditar.airbag = req.body.airbag ;

        writeFile(productos);
        res.redirect("/products/");

    }
}

module.exports = productController;
