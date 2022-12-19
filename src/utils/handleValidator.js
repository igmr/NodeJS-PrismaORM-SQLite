const {validationResult} = require('express-validator')
const {respondFailValidationErrors} = require('./handleHttpResponse')

const handleValidation = (req,res,next)=>{
    try{
        const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            return {param,msg};
        };
        validationResult(req).formatWith(errorFormatter).throw()
        return next()
    }catch(error){
        return respondFailValidationErrors(res,error.array())
    }
}

module.exports = handleValidation

// * https://express-validator.github.io/docs/running-imperatively.html
// * https://express-validator.github.io/docs/validation-result-api.html
