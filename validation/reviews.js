const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateReviewInput = [
    check('rating')
        .exists({ checkFalsy: true })
        .isNumeric({ min: 1, max: 5})
        .withMessage('Rating must be between 1 to 5 stars'),

    check('comment')
        .isLength({ min: 5, max: 100 })
        .withMessage('Minimum 5 characters, maximum 100 characters'),

    handleValidationErrors
]

module.exports = validateReviewInput;