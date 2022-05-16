const Email = require("../../models/Email")
const User = require("../../models/User")

class CreateEmailController {
    async handle(request, response) {
        const { user_id } = request.params
        const { email } = request.body

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

        // Validando email
        if (!email) {
            return response.status(400).json({
                error: "Preencha o email!"
            })
        }

        var validaMail = /\S+@\S+\.\S+/

        if (!validaMail.test(email)) {
            return response.status(400).json({
                error: "Email inválido!"
            })
        }

        // Validando se email já existe
        const emailAlreadyExists = await Email.findOne({
            where: {
                email,
                user_id
            }
        })

        if (emailAlreadyExists) {
            return response.status(400).json({
                error: `Email ${email} já está cadastrado neste usuário!`
            })
        }

        // Cadastrando o email
        try {
            const userEmail = await Email.create({
                email,
                user_id
            })

            return response.status(201).json(userEmail)
        } catch (err) {
            return response.status(500).json({
                error: err
            })
        }
    }
}

module.exports = { CreateEmailController }