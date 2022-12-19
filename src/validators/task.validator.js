const {check} = require('express-validator')
const handleValidator = require('./../utils/handleValidator')

const checkId = [
    check('id')
        .notEmpty()
        .isNumeric()
        .custom(value=>{
            if(Number(value) < 1)
                throw new Error('Invalid value')
            return true
        })
        .escape()
        .trim(),
    (req, res, next) => handleValidator(req,res,next)
]

const checkStore = [
    check('project')
        .notEmpty()
        .isNumeric()
        .escape()
        .trim()
        .custom( value =>{
            if(Number(value) < 1)
                throw new Error('Invalid value')
            return true
        }),
    check('description')
        .notEmpty()
        .isLength({max:255})
        .escape()
        .trim(),
    (req, res, next) => handleValidator(req,res,next)
]

const checkEdit = [
    check('id')
        .notEmpty()
        .isNumeric()
        .custom(value=>{
            if(Number(value) < 1)
                throw new Error('Invalid value')
            return true
        })
        .escape()
        .trim(),
    check('description')
        .notEmpty()
        .isLength({max:255})
        .escape()
        .trim(),
    (req, res, next) => handleValidator(req,res,next)
]

module.exports = { checkId, checkStore, checkEdit }

// * https://express-validator.github.io/docs/custom-validators-sanitizers.html
// * https://express-validator.github.io/docs/custom-error-messages.html
// * https://express-validator.github.io/docs/schema-validation.html
// * https://express-validator.github.io/docs/whole-body-validation.html
