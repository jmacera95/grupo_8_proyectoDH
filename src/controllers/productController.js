const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');

// const's for business logic related validations
const currentYear = (new Date).getFullYear();
const minYearOfManufacture = currentYear-10;
const maxYearOfManufacture = currentYear-5;

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
        res.render('productCreate', {minYearOfManufacture: minYearOfManufacture, maxYearOfManufacture: maxYearOfManufacture}); 
    },
    saveNewProduct: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('productCreate', { errors: errors.mapped(), old: req.body, minYearOfManufacture: minYearOfManufacture, maxYearOfManufacture: maxYearOfManufacture });
        } else {
            if (!req.file) {
                const error = new Error("La imagen no se ha subido de forma correcta.");
                next(error);
            } else {
                const productos = TraerProductos();
                const newProduct = {
                    id: productos.length + 1,
                    img: req.file.filename,
                    marca: req.body.marca,
                    modelo: req.body.modelo,
                    anio: Number(req.body.anio),
                    kilometraje: Number(req.body.kilometraje),
                    provincia: req.body.provincia,
                    localidad: req.body.localidad,
                    precio: Number(req.body.precio),
                    combustible: req.body.combustible,
                    transmision: req.body.transmision,
                    cantidadDueños: req.body.camtidadDuenios,
                    fechaService: req.body.fechaService,
                    embrague: req.body.embrague,
                    antiguedadCorrea: Number(req.body.antiguedadCorrea),
                    alineacionBalanceo: req.body.alineacionBalanceo,
                    cantidadPuertas: Number(req.body.cantidadPuertas),
                    abs: req.body.abs,
                    airbag: req.body.airbag,
                    destacado: req.body.destacado === "true"
            };

                productos.push(newProduct); 
                writeFile(productos);
                res.redirect(`/products/product-detail/${newProduct.id}`);
            }
        }
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

        if (req.file) {
            fs.unlinkSync(path.join(__dirname, '../../public/images/products', productoAEditar.img));
            productoAEditar.img = req.file.filename;
        }

        productoAEditar.marca = req.body.marca ;
        productoAEditar.modelo = req.body.modelo ;
        productoAEditar.anio = Number(req.body.anio) ;
        productoAEditar.kilometraje = Number(req.body.kilometraje) ;
        productoAEditar.provincia = req.body.provincia ;
        productoAEditar.localidad = req.body.localidad ;
        productoAEditar.precio = Number(req.body.precio) ;
        productoAEditar.combustible = req.body.combustible ;
        productoAEditar.transmision = req.body.transmision ;
        productoAEditar.camtidadDueños = req.body.camtidadDueños ;
        productoAEditar.fechaService = req.body.fechaService ;
        productoAEditar.embrague = req.body.embrague ;
        productoAEditar.antiguedadCorrea = Number(req.body.antiguedadCorrea) ;
        productoAEditar.alineacionBalanceo = req.body.alineacionBalanceo ;
        productoAEditar.cantidadPuertas = Number(req.body.cantidadPuertas) ;
        productoAEditar.abs = req.body.abs ;
        productoAEditar.airbag = req.body.airbag ;
        productoAEditar.destacado = req.body.destacado == "true" ;
        
        writeFile(productos);
        res.redirect(`/products/product-detail/${productoAEditar.id}`);

    },
    delete: (req, res) => {
        const productos = TraerProductos();
        const productoEliminar = productos.find(product => product.id == req.params.id)
        const productoEliminarIndex = productos.findIndex(product => product.id == req.params.id);
        if(productoEliminarIndex != -1){
            const productImagePath = path.join(__dirname, '../../public/images/products', productoEliminar.img)
            productos.splice(productoEliminarIndex, 1);
            writeFile(productos);
            fs.unlinkSync(productImagePath);
        };
        res.redirect('/products');
    }
}

module.exports = productController;
