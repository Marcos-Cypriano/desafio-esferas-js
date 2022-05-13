const User = require("../../models/User")


class DeleteUserController {
    async handle(request, response) {
        const { user_id } = request.body

        // Verificando existência do usuário
        const userAlreadyExists = await User.findByPk(user_id)

        if (!userAlreadyExists) {
            return response.status(404).json({
                error: "Usuário não encontrado!"
            })
        }

        // Deletando usuário
        try {
            await User.destroy({
                where: {
                    id: user_id
                }
            })

            return response.status(200).json({
                message: "Usuário deletado com sucesso!"
            })
        } catch (err) {
            return response.status(500).json({
                error: err
            })
        }

    }
}

module.exports = { DeleteUserController }