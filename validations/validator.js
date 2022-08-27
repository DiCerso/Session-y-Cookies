const {body} = require('express-validator');

module.exports = [
    body('nombre')
        .notEmpty().withMessage('Por favor, ingresa tu nombre.'),

    body('colors')
        .notEmpty().withMessage('Por favor, ingresa tu color.'),

    body('mail')
        .notEmpty().withMessage('Por favor, ingresa tu mail.'),

    body('edad')
        .notEmpty().withMessage('Por favor, ingresa tu edad.').bail()
        .isNumeric().withMessage('Ingrese un valor numerico')
]