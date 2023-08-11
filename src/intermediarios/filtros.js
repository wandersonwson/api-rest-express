function validarSenhaBanco(request, response, next) {
    const {senha_banco } = request.query;
    if (!senha_banco) {
        return response.status(400).json({mensagem: "A senha é um parâmetro obrigatório"});
    }
    next();
}
function validarConta(request, response, next) {
    const { nome, email, cpf, data_nascimento, telefone, senha } = request.body;
    if (!nome && !email && !cpf && !data_nascimento && !telefone && !senha) {
        return response.status(400).json({mensagem: "Requisição sem todos os campos obrigatórios"});
    }
    next();    
}
function validarNumeroConta(request, response, next) {
    const { numeroConta } = request.params;
    if(isNaN(Number(numeroConta))) {
        return response.status(400).json({mensagem: "Número de conta inválido"});
    }
    next();
}
function validarDeposito(request, response, next) {
    const { numero_conta, valor } = request.body;
    if (!numero_conta) {
        return response.status(400).json({mensagem: "O número da conta é um campo obrigatório"});
    }
    if (!valor) {
        return response.status(400).json({mensagem: "O valor é um campo obrigatório"});
    }
    if(isNaN(Number(numero_conta))) {
        return response.status(400).json({mensagem: "Número de conta inválido"});
    }
    if(isNaN(Number(valor))) {
        return response.status(400).json({mensagem: "Valor em formato inválido"});
    }
    next();
}
function validarSaque(request, response, next) {
    const { numero_conta, valor, senha } = request.body;
    if (!numero_conta) {
        return response.status(400).json({mensagem: "O número da conta é um campo obrigatório"});
    }
    if (!valor) {
        return response.status(400).json({mensagem: "O valor é um campo obrigatório"});
    }
    if (!senha) {
        return response.status(400).json({mensagem: "A senha é um campo obrigatório"});
    }
    if(isNaN(Number(numero_conta))) {
        return response.status(400).json({mensagem: "Número de conta inválido"});
    }
    if(isNaN(Number(valor))) {
        return response.status(400).json({mensagem: "Valor em formato inválido"});
    }
    next();
}
function validarTransferencia(request, response, next) {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = request.body;
    if (!numero_conta_origem) {
        return response.status(400).json({mensagem: "O número da conta de origem é um campo obrigatório"});
    }
    if (!numero_conta_destino) {
        return response.status(400).json({mensagem: "O número da conta de destino é um campo obrigatório"});
    }
    if (!valor) {
        return response.status(400).json({mensagem: "O valor é um campo obrigatório"});
    }
    if (!senha) {
        return response.status(400).json({mensagem: "A senha é um campo obrigatório"});
    }
    if(isNaN(Number(numero_conta_origem))) {
        return response.status(400).json({mensagem: "Número da conta de origem inválido"});
    }
    if(isNaN(Number(numero_conta_destino))) {
        return response.status(400).json({mensagem: "Número da conta de destino inválido"});
    }
    if(isNaN(Number(valor))) {
        return response.status(400).json({mensagem: "Valor em formato inválido"});
    }
    next();
}
function validarConsulta(request, response, next) {
    const { numero_conta, senha } = request.query;
    if (!numero_conta) {
        return response.status(400).json({mensagem: "O número da conta é um parâmetro obrigatório"});
    }
    if (!senha) {
        return response.status(400).json({mensagem: "A senha é um parâmetro obrigatório"});
    }
    if(isNaN(Number(numero_conta))) {
        return response.status(400).json({mensagem: "Número de conta inválido"});
    }
    next();
}
export {
    validarSenhaBanco,
    validarConta,
    validarNumeroConta,
    validarDeposito,
    validarSaque,
    validarTransferencia,
    validarConsulta
};