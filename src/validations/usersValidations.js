const path = require('path');
const { body } = require('express-validator');

const usersValidations = {

    registerValidations: [
        
    ],

    editValidations: [
        body('firstName')
            .notEmpty().withMessage('Debes completar el campo Nombre').bail()
            .isLength({ min: 3 }).withMessage('Revisar la longitud del Nombre').bail()

        ,
        body('lastName')
            .notEmpty().withMessage('Debes completar el campo Apellido').bail()
            .isLength({ min: 2 }).bail()
        ,
        body('cuit')
            .notEmpty().withMessage('Debes completar el campo CUIT').bail()
            .isNumeric().withMessage('Debe contener unicamente numeros').bail()
            .isLength({ min: 11, max: 11 }).withMessage('El CUIT debe contener 11 digitos').bail()

        ,
        body('phone')
            .notEmpty().withMessage('Debes completar el campo Telefono').bail()
            .isMobilePhone().withMessage('Debe ser un numero de telefono valido').bail()
        ,
        body('email')
            .notEmpty().withMessage('Debes completar el campo Email').bail()
            .isEmail().withMessage('El email no es valido').bail()
        ,
        body('cp')
            .notEmpty().withMessage('Debes completar el campo Código Postal').bail()
            .isLength({ min: 4, max: 4 }).withMessage('Debe ser un código postal válido')
        ,
    ]
}



module.exports = usersValidations;