const Phone = require('../../models/Phone')
const User = require('../../models/User')

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
            try {
                var documentArray = document.split("").map(Number)
            } catch (err) {
                return response.status(400).json({
                    error: err
                })
            }
    
            documentArray.reduce((previousValue, currentValue) => {
                if (previousValue === currentValue) {
                    return response.status(400).json({
                        error: "CPF inválido!"
                    })
                } else {
                    previousValue = currentValue
                }
            }, 10)
    
            var validaCpf1 = 0
            var validaCpf2 = 0
    
            for (var i = 0; i < 9; i++) {
                validaCpf1 += (10 - i) * documentArray[i]
            }
    
            for (var i = 0; i < 10; i++) {
                validaCpf2 += (11 - i) * documentArray[i]
            }
    
            if (document.length != 11 ||    // Não possua 11 algarismos
                    ((validaCpf1 * 10) % 11) != document[9] ||    // Verificador do primeiro dígito de validação
                    ((validaCpf2 * 10) % 11) != document[10]    // Verificador do segundo dígito de validação
                ) {
                return response.status(400).json({
                    error: "CPF inválido!"
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
            var user = await User.create({
                name,
                last_name,
                document
            })
        } catch (err) {
            return response.status(400).json({
                error: err
            })
        }

        try {
            const phone = await Phone.create({
                phone,
                user_id: user.id
            })

            // if (email) {
            //     const email = await connection('emails').insert({
            //         email,
            //         user_id: user.id
            //     })
            // }

            return response.status(201).json({
                message: `Usuário ${user.name} ${user.last_name} foi cadastrado com sucesso!`
            })
        } catch (err) {
            return response.status(400).json({
                error: err
            })
        }
    }
}

module.exports = { CreateUserController }