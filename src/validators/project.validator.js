const { check } = require('express-validator')
const handleValidator = require('./../utils/handleValidator')
const { find, findProjectByName } = require('./../services/project.service')

const checkFind = [
    check('id')
        .notEmpty()
        .isNumeric()
        .custom(async (value)=>{
            if(Number(value) < 1)
                throw new Error('Invalid value')
            const project = await find(Number(value))
            if(!project)
                throw new Error('Not found')
            return true
        })
        .escape()
        .trim(),
    (req, res, next) => handleValidator(req,res,next)
]

const checkDestroy = [
    check('id')
        .notEmpty()
        .isNumeric()
        .custom(async (value)=>{
            if(Number(value) <= 1)
                throw new Error('Invalid value')
            const project = await find(Number(value))
            if(!project)
                throw new Error('Not found')
            return true
        })
        .escape()
        .trim(),
    (req, res, next) => handleValidator(req,res,next)
]

const checkStore = [
    check('name')
        .notEmpty()
        .isLength({max:255})
        .escape()
        .trim()
        .custom(async(value)=>{
            const project = await findProjectByName(value)
            if(project)
                throw new Error('Not found')
            return true
        }),
    check('description')
        .isLength({max:255})
        .escape()
        .trim()
        .optional(),
    (req, res, next) => handleValidator(req,res,next)
]

const checkEdit = [
    check('id')
        .notEmpty()
        .isNumeric()
        .custom(async (value)=>{
            if(Number(value) < 1)
                throw new Error('Invalid value')
            const project = await find(Number(value))
            if(!project)
                throw new Error('Not found')
            return true
        })
        .escape()
        .trim(),
    check('name')
        .isLength({max:255})
        .escape()
        .trim()
        .custom(async(value, { req })=>{
            const {id} = req.params
            const project = await findProjectByName(value)
            if(project)
            {
                if(project.id != id)
                    throw new Error('Exists')
            }
            return true
        })
        .optional(),
    check('description')
        .isLength({max:255})
        .escape()
        .trim()
        .optional(),
    (req, res, next) => handleValidator(req,res,next)
]

module.exports = {checkFind, checkStore, checkEdit, checkDestroy}

// * https://express-validator.github.io/docs/custom-validators-sanitizers.html
// * https://express-validator.github.io/docs/custom-error-messages.html
// * https://express-validator.github.io/docs/schema-validation.html
// * https://express-validator.github.io/docs/whole-body-validation.html
