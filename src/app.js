const express = require("express")
const swaggerUi = require('swagger-ui-express')
const routes = require('./routes')

const swaggerFile = require('./swagger.json')

require('./database')

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes)

module.exports = app