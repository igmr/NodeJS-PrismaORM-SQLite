const {Prisma} = require('@prisma/client')
const {respondFailServerError, respondFailValidationErrors} = require('./handleHttpResponse')

const respondException = (res, ex)=>{
    console.log(ex)
    if(ex instanceof Prisma.PrismaClientKnownRequestError
        || ex instanceof Prisma.PrismaClientUnknownRequestError
        || ex instanceof Prisma.PrismaClientRustPanicError
        || ex instanceof Prisma.PrismaClientInitializationError
    )
    {
        const errors = {
            code: ex.code,
            meta: ex.meta,
            message: ex.message,
            clientVersion: ex.clientVersion,
        }
        return respondFailValidationErrors(res, errors)
    }
    if(ex instanceof Prisma.PrismaClientValidationError)
    {
        const errors = {
            msg: ex.message,
            clientVersion: ex.clientVersion,
        }
        return respondFailValidationErrors(res, errors)
    }
    return respondFailServerError(res, 'Exception')
}

module.exports = respondException

// * https://www.prisma.io/docs/concepts/components/prisma-client/handling-exceptions-and-errors
// * https://www.prisma.io/docs/reference/api-reference/error-reference

