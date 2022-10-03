const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateRoomInput = [

    check('title')
        .exists({ checkFalsy: true})
        .isLength({ min: 3, max: 50 })
        .withMessage('Must title your room!'),

    check('game')
        .exists({ checkFalsy: true })
        .withMessage('Must select game to create room.'),

    check('duration')
        .exists({ checkFalsy: true })
        .isNumeric({min: 30, max: 240 })
        .withMessage('Select between 30 minutes to 4 hours.'),
    
    check('privacy')
        .isBoolean()
        .withMessage('Select whether you want your room to be private.'),
    
    check('comments')
        .exists({ checkFalsy: true })
        .isLength({ min: 7, max: 50 })
        .withMessage('Minimum 7 characters, maximum 50 characters'),

    handleValidationErrors
]

module.exports = validateRoomInput;