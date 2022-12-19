
const { matchedData } = require('express-validator')
const respondException = require('./../utils/handleHttpException')
const { respond, respondFail, respondCreated } = require('./../utils/handleHttpResponse')
const projectService = require('./../services/project.service')
const taskService = require('./../services/task.service')

const index = async (req, res, next)=>{
    try {
        const data = await taskService.findAll()
        return respond(res, data)
    } catch (ex) {
        return respondException(res, ex)
    }
}

const show = async (req, res, next)=>{
    try {
        const {id} = matchedData(req, {locations:['params']})
        const data = await taskService.find(id)
        return respond(res, data)
    } catch (ex) {
        return respondException(res, ex)
    }
}

const store = async (req, res, next)=>{
    try {
        req = matchedData(req, {locations:['body']})
        const existProject = await projectService.find(Number(req.project))
        if(!existProject) return respondFail(res, 'Project, not found')
        let payload = {
            projectId: Number(req.project),
            description: req.description
        }
        const data = await taskService.store(payload)
        return respondCreated(res, data)
    } catch (ex) {
        return respondException(res, ex)
    }
}

const edit = async (req, res, next)=>{
    try {
        const {id} = matchedData(req, {locations:['params']})
        let payload = matchedData(req, {locations:['body']})
        payload = {...payload, updatedAt: new Date()}
        const data = await taskService.edit(id, payload)
        return respond(res, data)
    } catch (ex) {
        return respondException(res, ex)
    }
}

const completed = async (req, res, next)=>{
    try {
        return respond(res, {})
    } catch (ex) {
        return respondException(res, ex)
    }
}

const destroy = async (req, res, next)=>{
    try {
        const {id} = matchedData(req, { locations:['params']})
        const data = await taskService.destroy(id)
        return respond(res, data)
    } catch (ex) {
        return respondException(res, ex)
    }
}

module.exports = {
    index, show, 
    store, edit, completed,
    destroy
}

// * https://express-validator.github.io/docs/matched-data-api.html
