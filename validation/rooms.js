const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateRoomInput = [
    check('host')
        .exists({ checkFalsy: true })
        .withMessage('Must be logged in to create a room!'),

    check('game')
        .exists({ checkFalsy: true })
        .withMessage('Must select game to create room.'),

    check('duration')
        .exists({ checkFalsy: true })
        .isNumeric({min: 30, max: 240 })
        .withMessage('Select between 30 minutes to 4 hours.'),
    
    check('private')
        .exists({ checkFalsy: true })
        .isBoolean()
        .withMessage('Select whether you want your room to be private.'),

    handleValidationErrors
]

module.exports = validateRoomInput;