const path = require('path');
const { body } = require('express-validator');

const usersValidations = {

    registerValidations: [
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

        ,
        body('phone')
            .notEmpty().withMessage('Debes completar el campo Telefono').bail()


        ,
        body('email')
            .notEmpty().withMessage('Debes completar el campo Email').bail()
            .isEmail().withMessage('El email no es valido').bail()

        ,
        body('cp')
            .notEmpty().withMessage('Debes completar el campo Código Postal').bail()

        ,
        body('password')
            .notEmpty().withMessage('Debes elegir una Contraseña').bail()
            .isStrongPassword().withMessage('Seguridad baja')
            // .isLength({min:6}).withMessage('Debe tener mas de 6 caracteres')
        ,
        
        body('checkpassword')
            .notEmpty().withMessage('Debes confirmar la Contraseña').bail()

        ,
    ],
    editValidations: [
        body('firstName')
            // .notEmpty().withMessage('Debes completar el campo Nombre').bail()
            .isLength({ min: 3 }).withMessage('Revisar la longitud del Nombre').bail()

        ,
        body('lastName')
            .notEmpty().withMessage('Debes completar el campo Apellido').bail()
            .isLength({ min: 2 }).bail()
        ,
        body('cuit')
            .notEmpty().withMessage('Debes completar el campo CUIT').bail()

        ,
        body('phone')
            .notEmpty().withMessage('Debes completar el campo Telefono').bail()


        ,
        body('email')
            .notEmpty().withMessage('Debes completar el campo Email').bail()
            .isEmail().withMessage('El email no es valido').bail()

        ,
        body('cp')
            .notEmpty().withMessage('Debes completar el campo Código Postal').bail()

        ,
    ]
}

module.exports = usersValidations;