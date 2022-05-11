const Sequelize = require("sequelize")
const dbConfig = require("../config/database")

const User = require("../modules/User/models/User")
const Phone = require("../modules/User/models/Phone")
// const Email = require("../modules/User/models/Email")

const connection = new Sequelize(dbConfig.development)

User.init(connection)
Phone.init(connection)
// Email.init(connection)

User.associate(connection.models)
Phone.associate(connection.models)
// Email.associate(connection.models)

module.exports = connection
