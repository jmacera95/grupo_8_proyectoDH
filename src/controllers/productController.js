const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const { Op } = require("sequelize");

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
                return res.render('productCreate', {minYearOfManufacture: minYearOfManufacture, maxYearOfManufacture: maxYearOfManufacture, vehicles: vehicles}); 
            })
        
    },
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
                    return res.render('productCreate', { errors: errors.mapped(), old: req.body, minYearOfManufacture: minYearOfManufacture, maxYearOfManufacture: maxYearOfManufacture, vehicles: vehicles });
                })
        } else {
            if (!req.file) {
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
                    return res.render('productEdit', {producto: vehicle});
                }
            )
    },
    actualizar : (req,res) => {
        if (req.file) {
            db.Vehicles.findByPk(req.params.id)
                .then(
                    vehicle => {
                        fs.unlinkSync(path.join(__dirname, '../../public/images/products', vehicle.image_path));       
                    }
                )
        }

        db.Vehicles.update(
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
                image_path: (req.file ? req.file.filename : req.body.img),
                outstanding: req.body.destacado === "true"
            },
            {
                where: {id: req.params.id}
            }
        )
            .then(response => {
                res.redirect(`/products/product-detail/${req.params.id}`);
            })

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
    }
}

module.exports = productController;
