const { Op } = require('sequelize')
const User = require("../../models/User")

class SearchUserController {
    async handle(request, response) {
        const { pesquisa } = request.body

        // Verificando possibilidade da pesquisa
        if (!pesquisa) {
            return response.status(400).json({
                error: "Preencha alguma propriedade para efetuar a pesquisa."
            })
        }

        // Sanitizando entrada
        const regValidator = /\W|_/g
        
        if (regValidator.test(pesquisa)) {
            return response.status(400).json({
                error: "Preencha com uma pesquisa válida (sem caracteres especiais)."
            })
        }

        // Realizando a pesquisa
        try {
            const result = await User.findAll({
                where: {
                    [Op.or]: {
                        name: {
                            [Op.iLike]: `%${pesquisa}%`
                        },
                        last_name: {
                            [Op.iLike]: `%${pesquisa}%`
                        },
                        document: {
                            [Op.iLike]: `%${pesquisa}%`
                        }
                    }
                },
                include: [{ all: true, nested: true }]
            })


            return response.status(200).json(result)
        } catch (err) {
            return response.status(500).json({
                error: err
            })
        }
    }
}

module.exports = { SearchUserController }