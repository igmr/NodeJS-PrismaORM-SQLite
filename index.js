
const app = require('./src/app')

const port = process.env.port || 3001

const runApp = ()=>{
    app.listen(port, ()=> console.info(`App listening on http://localhost:${port}`))
}

const main = async ()=>{
    runApp()
}

main()