const { matchedData } = require('express-validator')
const { respond, respondFail, respondCreated } = require('./../utils/handleHttpResponse')
const respondException = require('./../utils/handleHttpException')
const projectService = require('./../services/project.service')

const index = async (req, res, next)=>{
    try {
        const data = await projectService.findAll()
        return respond(res, data)
    } catch (ex) {
        return respondException(res, ex)
    }
}

const show = async (req, res, next)=>{
    try {
        const {id} = matchedData(req, { locations:['params'] })
        const data = await projectService.find(id)
        return respond(res, data)
    } catch (ex) {
        return respondException(res, ex)
    }
}

const store = async (req, res, next)=>{
    try {
        payload = matchedData(req, { locations:['body']})
        const data = await projectService.store(payload)
        return respondCreated(res, data)
    } catch (ex) {
        return respondException(res, ex)
    }
}

const edit = async (req, res, next)=>{
    try {
        const {id} = matchedData(req, {locations:['params']})
        req = matchedData(req,{locations:['body']})
        if(Object.entries(req).length == 0) return respondFail(res, 'Data not found')
        req = {...req, updatedAt: new Date()}
        const data = await projectService.edit(id, req)
        return respond(res, data)
    } catch (ex) {
        return respondException(res, ex)
    }
}

const destroy = async (req, res, next)=>{
    try {
        const {id} = matchedData(req, {locations:['params']})
        const data = await projectService.destroy(id)
        console.log(data)
        return respond(res, data)
    } catch (ex) {
        return respondException(res, ex)
    }
}

module.exports = {
    index, show, 
    store, edit, destroy
}

// * https://express-validator.github.io/docs/matched-data-api.html
