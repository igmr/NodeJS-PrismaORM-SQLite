const { Router } = require('express')
const { index, show, store, edit, destroy, completed } = require('./../controllers/task.controller')
const { checkStore, checkEdit, checkId } = require('./../validators/task.validator')

const projectAPI = (app)=>{
    const projectRouter = Router()
    projectRouter.group("/api/task", router =>{
        router.get('/', index)
        router.get('/:id', checkId, show)
        router.post('/', checkStore, store)
        router.put('/:id',checkEdit, edit)
        router.put('/complete/:id', checkId, completed)
        router.delete('/:id', checkId, destroy)
    })
    app.use(projectRouter)
}

module.exports = projectAPI

// * https://expressjs.com/es/api.html#app