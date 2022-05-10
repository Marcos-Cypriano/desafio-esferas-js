const uuid = require("uuid")

class Email {
    constructor (email, user_id) {
        this.id = uuid.v4()
        this.email = email
        this.user_id = user_id
    }
}

module.exports = { Email: Email}