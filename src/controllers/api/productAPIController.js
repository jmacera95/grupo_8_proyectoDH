const db = require('../../database/models');
const { Op } = require("sequelize");
const path = require("path");

// const's for business logic related validations
const currentYear = (new Date).getFullYear();
const minYearOfManufacture = currentYear - 10;
const maxYearOfManufacture = currentYear - 5;

const productAPIController = {

    getProducts: async (req, res) => {
        const vehicles = await db.Vehicles.findAll({
            include: [{
                model: db.VehiclesModels,
                as: "vehicles_models"
            }],
            attributes: ["id"],
        })
        const unDuenio = await db.Vehicles.findAll({
            where: {
                total_owners: 1
            }
        });

        const dosDuenios = await db.Vehicles.findAll({
            where: {
                total_owners: 2
            }
        });

        vehicles.map((vehicle) => (vehicle.dataValues.name = vehicle.vehicles_models.model_name));
        vehicles.map((vehicle) => (vehicle.dataValues.description = vehicle.vehicles_models.name));
        vehicles.map((vehicle) => (vehicle.dataValues.detail = `/api/products/${vehicle.id}`));

        const response = {
            count: vehicles.length,
            count_by_category: {
                un_duenio: unDuenio.length,
                dos_duenios: dosDuenios.length
            },
            vehicles: vehicles,

        };
        return res.json(response);
    },

    getProduct: async (req, res) => {

        

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
                            url: 'api/products/vehicles_models/active'
                        },
                        data: vehicles
                    }
                    return res.json(response);
                }
            )
    }
}

module.exports = productAPIController;
