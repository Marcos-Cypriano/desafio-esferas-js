const Phone = require("../../models/Phone")
const User = require("../../models/User")

class CreatePhoneController {
    async handle(request, response) {
        const { user_id } = request.params
        const { phone } = request.body

        // Validando se usuário já existe
        try {
            const userAlreadyExists = await User.findByPk(user_id)

            if (!userAlreadyExists) {
                return response.status(404).json({
                    error: "Usuário não encontrado!"
                })
            }
        } catch (err) {
            return response.status(400).json({
                error: err
            })
        }

        // Validando telefone
        if (!phone) {
            return response.status(400).json({
                error: "Preencha o telefone!"
            })
        }

        if (isNaN(phone) || phone.length < 8 || phone.length > 9) {
            return response.status(400).json({
                error: "Telefone inválido!"
            })
        }

        // Validando se email já existe
        const phoneAlreadyExists = await Phone.findOne({
            where: {
                phone,
                user_id
            }
        })

        if (phoneAlreadyExists) {
            return response.status(400).json({
                error:  `Telefone ${phone} já está cadastrado neste usuário!`
            })
        }

        // Cadastrando o telefone
        try {
            const userPhone = await Phone.create({
                phone,
                user_id
            })

            return response.status(201).json(userPhone)
        } catch (err) {
            return response.status(500).json({
                error: err
            })
        }
    }
}

module.exports = { CreatePhoneController }