const db = require('../../database/models');
const { Op } = require("sequelize");

// const's for business logic related validations
const currentYear = (new Date).getFullYear();
const minYearOfManufacture = currentYear-10;
const maxYearOfManufacture = currentYear-5;

const productAPIController = {
    activeVehicleModelsList : (req, res) => {
        db.VehiclesModels.findAll(
            {
                where: {
                    year: {[Op.gte] : minYearOfManufacture, [Op.lte] : maxYearOfManufacture}
                }
            }
        )
            .then(
                vehicles => {
                    let response = {
                        meta: {
                            status : 200,
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
