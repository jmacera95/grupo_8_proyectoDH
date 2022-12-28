const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const { Op } = require("sequelize");
const fetch = require("node-fetch");

// const's for business logic related validations
const currentYear = (new Date).getFullYear();
const minYearOfManufacture = currentYear-10;
const maxYearOfManufacture = currentYear-5;

const productController = {
    productList : (req, res) => {
        db.Vehicles.findAll(
            {
                include: [
                    {
                        model: db.VehiclesModels,
                        as: "vehicles_models",
                        include: [{
                            model: db.Brand,
                            as: 'model_brand'
                        }]
                    }
                ]
            }
        )
            .then(
                vehicles => {
                    return res.render('productList', {productos: vehicles});
                }
            )
    },
    productDetail : (req, res) => {
        db.Vehicles.findByPk(req.params.id, {
            include: [
                {
                    model: db.VehiclesModels,
                    as: "vehicles_models",
                    include: [{
                        model: db.Brand,
                        as: 'model_brand'
                    }]
                }
            ]
        })
            .then(
                vehicle => {
                    return res.render('productDetail', {producto: vehicle});
                }
            )
    },
    create : (req, res) => {
        db.VehiclesModels.findAll(
            {
                where: {
                    year: {[Op.gte] : minYearOfManufacture, [Op.lte] : maxYearOfManufacture}
                }
            }
        )
            .then(vehicles => {
                fetch("https://apis.datos.gob.ar/georef/api/provincias")
                    .then(response => response.json())
                    .then(data => {
                            return res.render('productCreate', {minYearOfManufacture: minYearOfManufacture, maxYearOfManufacture: maxYearOfManufacture, vehicles: vehicles, provinces: data.provincias});
                            }
                        )
                    })                
            }
    ,
    saveNewProduct: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            db.VehiclesModels.findAll(
                {
                    where: {
                        year: {[Op.gte] : minYearOfManufacture, [Op.lte] : maxYearOfManufacture}
                    }
                }
            )
                .then(vehicles => {
                    fetch("https://apis.datos.gob.ar/georef/api/provincias")
                    .then(response => response.json())
                    .then(data => {
                        return res.render('productCreate', { errors: errors.mapped(), old: req.body, minYearOfManufacture: minYearOfManufacture, maxYearOfManufacture: maxYearOfManufacture, vehicles: vehicles, provinces: data.provincias });
                    })
                    
                })
        } else {
            db.Vehicles.findAll()
                .then(
                    vehicles => {
                        const existingVehicles = vehicles.map(vehicle => vehicle.legal_identifier);
                        const vehicleExists = existingVehicles.find(legalIdentifier => legalIdentifier === req.body.legal_identifier)
                        if (vehicleExists) {
                            db.VehiclesModels.findAll(
                                {
                                    where: {
                                        year: {[Op.gte] : minYearOfManufacture, [Op.lte] : maxYearOfManufacture}
                                    }
                                }
                            )
                                .then(vehicles => {
                                    fetch("https://apis.datos.gob.ar/georef/api/provincias")
                                    .then(response => response.json())
                                    .then(data => {
                                        return res.render('productCreate', { errors: {
                                            legal_identifier: {
                                                msg: 'El vehículo ya existe en la base de datos.'
                                            }
                                        }, old: req.body, minYearOfManufacture: minYearOfManufacture, maxYearOfManufacture: maxYearOfManufacture, vehicles: vehicles, provinces: data.provincias });
                                    })
                                    
                                })
                        } else if (!req.file) {
                            const error = new Error("La imagen no se ha subido de forma correcta.");
                            next(error);
                        } else {
                            db.Vehicles.create(
                                {
                                    vehicle_model_id: req.body.vehicle_model,
                                    price: Number(req.body.precio),
                                    kilometers: Number(req.body.kilometraje),
                                    last_service_date: req.body.fechaService,
                                    color: req.body.color, 
                                    last_balancing_alignment_date: req.body.alineacionBalanceo,
                                    timing_belt_age_kilometers: Number(req.body.antiguedadCorrea),
                                    airbag_status: req.body.airbag,
                                    total_owners: req.body.cantidadDuenios,
                                    legal_identifier: req.body.legal_identifier,
                                    location_province: req.body.provincia,
                                    clutch_status: req.body.embrague,
                                    image_path: req.file.filename,
                                    outstanding: req.body.destacado === "true"
                                }
                            )
                            .then(response => {
                                return res.redirect(`/products/product-detail/${response.id}`);
                            })
                        }
                    }
                )
        }
    },
    editar : (req, res) => {
        db.Vehicles.findByPk(req.params.id, {
            include: [
                {
                    model: db.VehiclesModels,
                    as: "vehicles_models",
                    include: [{
                        model: db.Brand,
                        as: 'model_brand'
                    }]
                }
            ]
        })
            .then(
                vehicle => {
                    fetch("https://apis.datos.gob.ar/georef/api/provincias")
                    .then(response => response.json())
                    .then(data => {
                        return res.render('productEdit', {producto: vehicle, provinces: data.provincias});
                    })                    
                }
            )
    },
    actualizar : (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            db.Vehicles.findByPk(req.params.id, {
                include: [
                    {
                        model: db.VehiclesModels,
                        as: "vehicles_models",
                        include: [{
                            model: db.Brand,
                            as: 'model_brand'
                        }]
                    }
                ]
            })
                .then(
                    vehicle => {
                        fetch("https://apis.datos.gob.ar/georef/api/provincias")
                        .then(response => response.json())
                        .then(data => {
                            return res.render('productEdit', {errors: errors.mapped(), old: req.body, producto: vehicle, provinces: data.provincias});
                        })                    
                    }
                )            
        } else {
            if (req.file) {
                db.Vehicles.findByPk(req.params.id)
                    .then(
                        vehicle => {
                            fs.unlinkSync(path.join(__dirname, '../../public/images/products', vehicle.image_path));       
                        }
                    )
            }
            db.Vehicles.update(
                // We don't update neither vehicle_model_id nor legal_identifier, cause that doesn't make sense. In case vehicle was created totally wrong, it must be deleted and created again.
                {
                    price: Number(req.body.precio),
                    kilometers: Number(req.body.kilometraje),
                    last_service_date: req.body.fechaService,
                    color: req.body.color, 
                    last_balancing_alignment_date: req.body.alineacionBalanceo,
                    timing_belt_age_kilometers: Number(req.body.antiguedadCorrea),
                    airbag_status: req.body.airbag,
                    total_owners: req.body.cantidadDuenios,
                    location_province: req.body.provincia,
                    clutch_status: req.body.embrague,
                    image_path: (req.file ? req.file.filename : req.body.img),
                    outstanding: req.body.destacado === "true"
                },
                {
                    where: {id: req.params.id}
                }
            )
                .then(response => {
                    return res.redirect(`/products/product-detail/${req.params.id}`);
                })
        }
    },
    delete: (req, res) => {
        db.Vehicles.findByPk(req.params.id)
            .then(
                vehicle => {
                    fs.unlinkSync(path.join(__dirname, '../../public/images/products', vehicle.image_path));
                    db.Vehicles.destroy(
                        {
                            where: {id: req.params.id}
                        }
                    )
                        .then(response => {
                            return res.redirect('/products');
                        })       
                }
            )
    },
    addToCart: async (req, res) => {
        if (req.session.productsInCart===undefined) {
            req.session.productsInCart = []
        }
        const productToAdd = await db.Vehicles.findByPk(req.params.id, {
            include: [
                {
                    model: db.VehiclesModels,
                    as: "vehicles_models",
                    include: [{
                        model: db.Brand,
                        as: 'model_brand'
                    }]
                }
            ]
        })
        if (!req.session.productsInCart.includes(productToAdd)) {
            req.session.productsInCart.push(productToAdd);
        }
        return res.status(204).send();
    },
    getCart: (req, res) => {
        if (req.session.productsInCart===undefined) {
            req.session.productsInCart = []
        }
        const productsInCart = req.session.productsInCart;
        return res.render('productCart', {products: productsInCart});
    },
    removeFromCart: (req, res) => {
        req.session.productsInCart = req.session.productsInCart.filter(product => {
            return product.id != req.params.id
        });
        return res.render('productCart', {products: req.session.productsInCart});
    }
}

module.exports = productController;
