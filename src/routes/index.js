const express = require('express')
const { CreatePhoneController } = require('../modules/User/useCases/createPhone/CreatePhoneController')
const { CreateUserController } = require('../modules/User/useCases/createUser/CreateUserController')

const routes = express.Router()

const createUserController = new CreateUserController
const createPhoneController = new CreatePhoneController

routes.get('/list', (req, res) => {
    res.send("Hello world!")
})

routes.post('/cadastro', createUserController.handle)

routes.post('/phone/:user_id', createPhoneController.handle)

routes.patch('/cadastro/:user_id', (req, res) => {
    res.send("Hello world!")
})

routes.delete('/cadastro/:user_id', (req, res) => {
    res.send("Hello world!")
})

module.exports = routes