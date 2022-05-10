const uuid = require("uuid")

class Phone {
    constructor (phone, user_id) {
        this.id = uuid.v4()
        this.phone = phone
        this.user_id = user_id
    }
}

module.exports = { Phone: Phone}