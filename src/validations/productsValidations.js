const path = require('path');
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
            .isInt().withMessage('El precio debe ser un número entero.').bail(),
        body('combustible')
            .notEmpty().withMessage('Debes compeltar el campo Tipo de Combustible.').bail()
            .isIn(['nafta', 'gasoil', 'gnc', 'hibrido']).withMessage('Los valores posibles para tipo de combustible son nafta, gasoil, gnc e híbrido.').bail(),
        body('transmision')
            .notEmpty().withMessage('Debes compeltar el campo Transmisión.').bail()
            .isIn(['manual', 'automatico']).withMessage('Los valores posibles para transmisión son manual y automático.').bail(),
        body('cantidadDuenios')
            .notEmpty().withMessage('Debes compeltar el campo Cantidad de dueños.').bail()
            .isIn(['1', '2']).withMessage('El vehículo no puede haber tenido más de dos dueños.').bail(),
        body('fechaService')
            .notEmpty().withMessage('Debes completar el campo Fecha Último Service.').bail()
            .isDate().withMessage('El valor debe ser una fecha.').bail(),
        body('embrague')
            .notEmpty().withMessage('Debes compeltar el campo Embrague.').bail()
            .isIn(['fabrica', 'repuesto']).withMessage('Los valores posibles para embrague son De Fábrica o Repuesto.').bail(),
        body('antiguedadCorrea')
            .notEmpty().withMessage('Debes completar el campo Antiguedad Correa de Distribución.').bail()
            .isInt({min: 0}).withMessage('El valor debe ser un número entero positivo.').bail(),
        body('alineacionBalanceo')
            .notEmpty().withMessage('Debes completar el campo Alineación y Balanceo.').bail()
            .isDate().withMessage('El valor debe ser una fecha.').bail(),
        body('cantidadPuertas')
            .notEmpty().withMessage('Debes compeltar el campo Cantidad de Puertas.').bail()
            .isIn(['3', '4', '5']).withMessage('Los valores posibles son 3, 4 o 5 puertas.').bail(),
        body('abs')
            .notEmpty().withMessage('Debes compeltar el campo ABS.').bail()
            .isIn(['si', 'no']).withMessage('Los valores posibles son Sí o No.').bail(),
        body('airbag')
            .notEmpty().withMessage('Debes compeltar el campo Airbag.').bail()
            .isIn(['tiene-adelante', 'tiene-ambos', 'no']).withMessage('Los valores posibles son Tiene - Solo Adelante, Tiene - Adelante y Atrás y No tiene.').bail(),
        body('destacado')
            .notEmpty().withMessage('Debes completar el campo Producto Destacado.').bail()
            .isIn(["true", "false"]).withMessage('Los valores posibles son Sí o No.').bail(),
        body('img')
            .custom(
                (value, { req }) => {
                    const acceptedFileExtensions = [".jpg", ".png", ".jpeg"];
                    return acceptedFileExtensions.includes(path.extname(req.file.originalname));
                }
            ).withMessage("El archivo no posee un formato adecuado. Las extensiones aceptadas son .jpg, .png y .jpeg")
    ]
}

module.exports = productsValidations;