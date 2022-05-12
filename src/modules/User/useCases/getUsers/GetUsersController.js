const Email = require("../../models/Email")
const Phone = require("../../models/Phone")
const User = require("../../models/User")


class GetUsersController {
    async handle(request, response) {
        
        try {
            const users = await User.findAll({
                include: [{ all: true, nested: true }]
            })

            return response.status(200).json({ users })
        } catch (err) {
            return response.status(400).json({
                error: err
            })
        }
    }
}

module.exports = { GetUsersController }