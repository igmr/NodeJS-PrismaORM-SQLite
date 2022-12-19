const express = require('express')
const cors = require('cors')
require('express-router-group');
const projectAPI = require('./routers/project.router')
const taskAPI = require('./routers/task.router')
const app = express()

app.use(express.json())
app.use(cors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
}))

// * Routers
projectAPI(app)
taskAPI(app)

module.exports = app;