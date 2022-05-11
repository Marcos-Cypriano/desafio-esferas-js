const Phone = require("../../models/Phone")



class CreatePhoneController {
    async handle(request, response) {
        const { user_id } = request.params
        const { phone } = request.body

        try {
            const newPhone = await Phone.create({
                phone,
                user_id
            })

            return response.status(201).json(newPhone)
        } catch (err) {
            return response.status(400).json({
                error: err
            })
        }
    }
}

module.exports = { CreatePhoneController }