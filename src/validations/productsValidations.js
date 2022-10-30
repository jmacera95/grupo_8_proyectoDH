const { body } = require('express-validator');

// const's for business logic related validations
const currentYear = (new Date).getFullYear();
const minYearOfManufacture = currentYear-10;
const maxYearOfManufacture = currentYear-5;

const productsValidations = {
    productsCreateValidations: [
        body('marca')
            .notEmpty().withMessage('Debes completar el campo marca.').bail(),
        body('modelo')
            .notEmpty().withMessage('Debes completar el campo modelo.').bail(),
        body('anio')
            .notEmpty().withMessage('Debes completar el campo año.').bail()
            .isInt({min: minYearOfManufacture, max: maxYearOfManufacture}).withMessage(`El año debe ser un número entero. Además, no debe ser menor a ${minYearOfManufacture} ni mayor a ${maxYearOfManufacture}`).bail(),
        body('kilometraje')
            .notEmpty().withMessage('Debes completar el campo kilometraje.').bail()
            .isInt({min: 85000, max: 200000}).withMessage('El vehículo no debe tener menos de 85.000 ni más de 200.000 kilómetros.').bail(),
        body('provincia')
            .notEmpty().withMessage('Debes completar el campo Provincia').bail(),
        body('localidad')
            .notEmpty().withMessage('Debes completar el campo Localidad.').bail(),
        body('precio')
            .notEmpty().withMessage('Debes completar el campo Precio.').bail()
            .isInt().withMessage('El precio debe ser un número entero.')
    ]
}

module.exports = productsValidations;