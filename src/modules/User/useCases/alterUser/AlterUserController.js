const cpfValidator = require("../../../../utils/documentValidator")
const User = require("../../models/User")


class AlterUserController {
    async handle(request, response) {
        const { user_id } = request.params
        const { name, last_name, document } = request.body

        // Verificando usuário
        const user = await User.findByPk(user_id)

        if (!user) {
            return response.status(404).json({
                error: "Usuário não encontrado!"
            })
        }

        // Alteração do nome
        if (name) {
            try {
                await User.update({ name }, {
                    where: {
                        id: user_id
                    }
                })
            } catch (err) {
                return response.status(400).json({
                    error: err
                })
            }
        }

        // Alteração do sobrenome
        if (last_name) {
            try {
                await User.update({ last_name }, {
                    where: {
                        id: user_id
                    }
                })
            } catch (err) {
                return response.status(400).json({
                    error: err
                })
            }
        }

        // Alteração do documento
        if (document) {
            // Verificando validade do CPF
            const documentValidator = cpfValidator(document)

            if (documentValidator.message === "CPF inválido!") {
                return response.status(400).json({
                    error: documentValidator.message
                })
            }

            try {
                await User.update({ document }, {
                    where: {
                        id: user_id
                    }
                })
            } catch (err) {
                return response.status(500).json({
                    error: err
                })
            }
        }

        return response.status(200).json({
            message: `Usuário *${user.name} ${user.last_name}* alterado com sucesso!`
        })
    }
}

module.exports = { AlterUserController }