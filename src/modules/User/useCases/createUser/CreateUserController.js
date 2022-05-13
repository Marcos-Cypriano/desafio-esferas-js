const Phone = require('../../models/Phone')
const User = require('../../models/User')
const Email = require('../../models/Email')
const cpfValidator = require('../../../../utils/documentValidator')

class CreateUserController {
    async handle(request, response) {
        const { name, last_name, document, email, phone } = request.body
        
        // Verificando falta de alguma informação na entrada
        if (!name || !last_name || !phone) {
            return response.status(400).json({
                error: "Campo(s) vazio(s)!"
            })
        }

        // Verificando telefone
        if (isNaN(phone) || phone.length < 8 || phone.length > 9) {
            return response.status(400).json({
                error: "Telefone inválido!"
            })
        }

        // Validando email
        if (email) {
            var validaMail = /\S+@\S+\.\S+/

            if (!validaMail.test(email)) {
                return response.status(400).json({
                    error: "Email inválido!"
                })
            }
        }

        // Verificando validade do CPF
        if (document) {
            const documentValidator = cpfValidator(document)

            if (documentValidator.message === "CPF inválido!") {
                return response.status(400).json({
                    error: documentValidator.message
                })
            }
        }

        // Validando se usuário já existe
        const userAlreadyExists = await User.findOne({
            where: {
                name,
                last_name
            }
        })

        if (userAlreadyExists) {
            return response.status(400).json({
                error: `Usuário *${name} ${last_name}* já existe!`
            })
        }

        // Inserindo novo usuário, telefone e email
        try {
            const user = await User.create({
                name,
                last_name,
                document
            })

            await Phone.create({
                phone,
                user_id: user.id
            })
    
            if (email) {
                await Email.create({
                    email,
                    user_id: user.id
                })
            }
    
            return response.status(201).json({
                message: `Usuário ${user.name} ${user.last_name} foi cadastrado com sucesso!`
            })

        } catch (err) {
            return response.status(500).json({
                error: err
            })
        }
    }
}

module.exports = { CreateUserController }