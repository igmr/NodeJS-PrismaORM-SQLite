const {Router} = require('express')
const { index, show, store, edit, destroy } = require('./../controllers/project.controller')
const { checkFind, checkStore, checkEdit, checkDestroy} = require('./../validators/project.validator')
const projectAPI = (app)=>{
    const projectRouter = Router()
    projectRouter.group("/api/project", router =>{
        router.get('/', index)
        router.get('/:id', checkFind, show)
        router.post('/', checkStore, store)
        router.put('/:id', checkEdit, edit)
        router.delete('/:id', checkDestroy, destroy)
    })
    app.use(projectRouter)
}

module.exports = projectAPI

// * https://expressjs.com/es/api.html#app
