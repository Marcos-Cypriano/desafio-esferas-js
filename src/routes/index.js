const express = require('express')
const { AlterUserController } = require('../modules/User/useCases/alterUser/AlterUserController')
const { CreateEmailController } = require('../modules/User/useCases/createEmail/CreateEmailController')
const { CreatePhoneController } = require('../modules/User/useCases/createPhone/CreatePhoneController')
const { CreateUserController } = require('../modules/User/useCases/createUser/CreateUserController')
const { DeleteUserController } = require('../modules/User/useCases/deleteUser/DeleteUserController')
const { GetUsersController } = require('../modules/User/useCases/getUsers/GetUsersController')
const { SearchUserController } = require('../modules/User/useCases/searchUser/SearchUserController')

const routes = express.Router()

const getUsersController = new GetUsersController
const createUserController = new CreateUserController
const createPhoneController = new CreatePhoneController
const createEmailController = new CreateEmailController
const deleteUserController = new DeleteUserController
const alterUserController = new AlterUserController
const searchUserController = new SearchUserController

routes.get('/list', getUsersController.handle)

routes.post('/search', searchUserController.handle)

routes.post('/register', createUserController.handle)

routes.post('/phone/:user_id', createPhoneController.handle)

routes.post('/email/:user_id', createEmailController.handle)

routes.patch('/alter/:user_id', alterUserController.handle)

routes.delete('/delete', deleteUserController.handle)

module.exports = routes