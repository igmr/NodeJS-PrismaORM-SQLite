
const respond = (res, data, code = 200)=>{
    if(typeof data === 'string')
        return res.status(code).json( { messages: data, })
    if(!data)
        return res.status(code).json({})
    if(Array.isArray(data))
        return res.status(code).json(data)
    if (Object.entries(data).length > 0)
        return res.status(code).json(data)
    if (Object.entries(data).length == 0)
        return res.status(code).json({})
}

const respondDeleted = (res, data = 'Deleted', code = 200)=>{
    return res.status(code).json( { messages: data, })
}

const respondCreated = (res, data = {})=>{
    return res.status(201).json(data)
}

const respondFail = (res, errorMessage = 'Bad request', code = 400, codeError = '')=>{
    if(codeError == '')
        codeError = code
    const payload = {
        status: code,
        code: codeError,
        messages: errorMessage,
    }
    return res.status(code).json(payload)
}

const respondFailValidationErrors = (res, data = {})=>{
    if(Array.isArray(data))
        return res.status(400).json(data)
    else
        return res.status(400).json({msg: data})
}

const respondUnauthorized = (res, message = 'Unauthorized')=>{
    const payload = { message, }
    return res.status(401).json(payload)
}

const respondFailServerError = (res, message = 'Internal Server Error', code = 500)=>{
    const payload = { message, }
    return res.status(code).json(payload)
}

//*	Exportamos funciones
module.exports = {
    respond, respondDeleted, respondCreated, respondFail,
    respondFailValidationErrors, respondUnauthorized,
    respondFailServerError
}

// * https://expressjs.com/es/api.html
