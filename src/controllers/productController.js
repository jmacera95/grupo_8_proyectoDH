const path = require('path');

const productos = [
    {
        id: 1,
        img: "/images/ford-fiesta.jpeg",
        modelo: "Ford Fiesta",
        breveDescripcion: "2012 - 120.000km - Bs. As.",
        precio: "$4.000.000"
    },
    {
        id: 2,
        img: "/images/chevrolet-onix.jpeg",
        modelo: "Chevrolet Onix",
        breveDescripcion: "2014 - 176.000km - Mendoza",
        precio: "$3.500.000"
    },
    {
        id: 3,
        img: "/images/renault-sandero.jpeg", 
        modelo: "Renault Sandero",
        breveDescripcion: "2016 - 153.000km - Rosario",
        precio: "$3.750.000"
    },
    {
        id: 4,
        img: "/images/ford-focus.jpeg", 
        modelo: "Ford Focus",
        breveDescripcion: "2013 - 120.000km - Córdoba",
        precio: "$4.700.000"
    },
    {
        id: 5,
        img: "/images/peugeot-208.jpeg", 
        modelo: "Peugeot 208",
        breveDescripcion: "2014 - 132.000km - Bs. As.",
        precio: "$4.200.000"
    },
    {
        id: 6,
        img: "/images/toyota-hilux.jpeg", 
        modelo: "Toyota Hilux",
        breveDescripcion: "2015 - 150.000km - Entre Ríos",
        precio: "$5.200.000"
    }
]

const productController = {
    productList : (req, res) => {
        res.render('productList', {productos: productos});
    },
    productDetail : (req, res) => {
        const producto = productos.filter(producto => producto.id == req.params.id)[0];
        res.render('productDetail', {producto: producto});
    },
    create : (req,res) => {
       res.render('productCreate'); 
    }
}

module.exports = productController;
