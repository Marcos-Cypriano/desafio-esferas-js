const uuid = require("uuid")

class User {
    constructor (name, last_name, document) {
        this.id = uuid.v4()
        this.name = name
        this.last_name = last_name
        this.document = document
    }
}

module.exports = { User: User }