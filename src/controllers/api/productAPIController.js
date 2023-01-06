const db = require('../../database/models');
const { Op } = require("sequelize");
const path = require("path");

// const's for business logic related validations
const currentYear = (new Date).getFullYear();
const minYearOfManufacture = currentYear - 10;
const maxYearOfManufacture = currentYear - 5;

const productAPIController = {

    getProducts: async (req, res) => {
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const resultsPerPage = page !== 0 ? 10 : null;
        const vehicles = await db.Vehicles.findAll({
            include: [{
                model: db.VehiclesModels,
                as: "vehicles_models",
                attributes: { exclude: ["id", "brand_id"] }
            }],
            attributes: { exclude: ["vehicle_model_id"] },
            limit: resultsPerPage,
            offset: resultsPerPage * (page - 1),
        })

        const oneOwner = vehicles.filter(vehicle => vehicle.dataValues.total_owners == 1).length;

        const twoOwners = vehicles.filter(vehicle => vehicle.dataValues.total_owners == 2).length;

        vehicles.map((vehicle) => (vehicle.dataValues.detail = `/api/products/${vehicle.id}`));

        const response = {
            count: vehicles.length,
            count_by_category: {
                one_owner: oneOwner,
                two_owners: twoOwners
            },
            vehicles: vehicles,

        };
        if (page > 1) {
            response.previous = `/api/products/?page=${page - 1}`;
          }
          if (vehicles.length == 10) {
            response.next = `/api/products/?page=${page + 1}`;
          }
        return res.json(response);
    },

    getProduct: async (req, res) => {
        const product = await db.Vehicles.findByPk(req.params.id, {
            attributes: {
                exclude: [
                    "vehicle_model_id",
                    "outstanding",
                    "image_path"
                ]
            }
        });
        const productt = await db.Vehicles.findByPk(req.params.id, {});

        product.dataValues.image_url = `/api/products/${product.id}/image`
        return res.json(product);
    },

    getProductImage: async (req, res) => {
        const productImagePath = await db.Vehicles.findByPk(req.params.id, {
            attributes: ["image_path"],
        });
        res.set({ "Content-Type": "image/png" });
        return res.sendFile(
            path.resolve(
                __dirname,
                `../../../public/images/products/${productImagePath.image_path}`
            )
        );
    },

    activeVehicleModelsList: (req, res) => {
        db.VehiclesModels.findAll(
            {
                where: {
                    year: { [Op.gte]: minYearOfManufacture, [Op.lte]: maxYearOfManufacture }
                }
            }
        )
            .then(
                vehicles => {
                    let response = {
                        meta: {
                            status: 200,
                            total: vehicles.length,
                            url: '/api/products/vehicles_models/active'
                        },
                        data: vehicles
                    }
                    return res.json(response);
                }
            )
    }
}

module.exports = productAPIController