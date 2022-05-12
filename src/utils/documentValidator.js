
const cpfValidator = (document) => {
    // Verificação do tamanho e se é constituído apenas de números
    if (isNaN(document) || document.length != 11) {
        return {
            message: "CPF inválido!"
        }
    }

    // Verfificação de cálculo dos valores dos algarismos de validação do CPF
    var validaCpf1 = 0
    var validaCpf2 = 0

    for (var i = 0; i < 9; i++) {
        validaCpf1 += (10 - i) * document[i]
    }

    for (var i = 0; i < 10; i++) {
        validaCpf2 += (11 - i) * document[i]
    }

    if (((validaCpf1 * 10) % 11) != document[9] ||    // Verificador do primeiro dígito de validação
            ((validaCpf2 * 10) % 11) != document[10]    // Verificador do segundo dígito de validação
        ) {
        return {
            message: "CPF inválido!"
        }
    }

    return {
        message: "CPF válido"
    }
}

module.exports = cpfValidator