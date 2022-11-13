const path = require('path');
const fs = require('fs');
const db = require('../database/models');

function TraerProductosDestacados() {
    const productsFile = fs.readFileSync(path.join(__dirname, '../database/products.json'))
    const productos = JSON.parse(productsFile);
    return productos.filter(producto => producto.destacado);  
};

const mainController = {
    index : (req, res) => {
        db.Vehicles.findAll(
            {
                where: {outstanding: true},
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
                    res.render('index', {productos: vehicles})
                }
            )
    }
}

module.exports = mainController;