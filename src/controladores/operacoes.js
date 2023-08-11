import dados from "../dados/bancodedados.js";
import {
    verificarExistenciaUsuario,
    criarConta,
    verificarExistenciaConta,
    buscarIndexConta,
    buscarConta,
    atualizarDadosUsuario,
    criarRegistro,
    criarRegistroTransferencia,
    montarExtrato
} from "../extras/utils.js";
function listarContas(request, response) {
    const { senha_banco } = request.query;
    if (senha_banco !== dados.banco.senha) {
        return response.status(401).json({mensagem: "Senha incorreta"});        
    }
    return response.status(200).json(dados.contas);
}
function cadastrarConta(request, response) {
    const { nome, email, cpf, data_nascimento, telefone, senha } = request.body;
    if (verificarExistenciaUsuario(cpf, email)) {
        return response.status(403).json({mensagem: "A requisição contém dados que já existem no banco de dados"});
    }
    const novaConta = criarConta(nome, email, cpf, data_nascimento, telefone, senha);
    dados.contas.push(novaConta);
    return response.status(201).json(novaConta);
}
function excluirConta(request, response) {
    const { numeroConta } = request.params;
    if (!verificarExistenciaConta(numeroConta)) {
        return response.status(404).json({mensagem: "Conta inexistente"});
    }
    const conta = buscarConta(numeroConta);
    if (conta.saldo > 0) {
        return response.status(403).json({mensagem: "Conta com saldo positivo"});
    }
    const index = buscarIndexConta(numeroConta);
    dados.contas.splice(index, 1);
    return response.status(200).json({mensagem: "Conta excluída com sucesso"});
}
function atualizarUsuario(request, response) {
    const { numeroConta } = request.params;
    const { nome, email, cpf, data_nascimento, telefone, senha } = request.body;
    if (!verificarExistenciaConta(numeroConta)) {
        return response.status(404).json({mensagem: "Conta inexistente"});
    }
    if (!nome && !email && !cpf && !data_nascimento && !telefone && !senha) {
        return response.status(400).json({mensagem: "Pelo menos uma propriedade precisa ser informada para atualizar o usuário"});
    }
    let usuarioExistente = false;
    if (cpf || email) {
        usuarioExistente = verificarExistenciaUsuario(cpf, email);
    }
    if (usuarioExistente) {
        return response.status(403).json({mensagem: "A requisição contém dados que já existem no banco de dados"});
    }
    atualizarDadosUsuario(numeroConta, nome, email, cpf, data_nascimento, telefone, senha);
    return response.status(200).json({mensagem: "Usuário atualizado com sucesso"});
}
function depositar(request, response) {
    const { numero_conta, valor } = request.body;
    if (!verificarExistenciaConta(numero_conta)) {
        return response.status(404).json({mensagem: "Conta inexistente"});
    }
    const conta = buscarConta(numero_conta);
    conta.saldo += Number(valor);
    const deposito = criarRegistro(numero_conta, valor);
    dados.depositos.push(deposito);
    return response.status(200).json({mensagem: "Depósito realizado com sucesso"});
}
function sacar(request, response) {
    const { numero_conta, valor, senha } = request.body;
    if (!verificarExistenciaConta(numero_conta)) {
        return response.status(404).json({mensagem: "Conta inexistente"});
    }
    const conta = buscarConta(numero_conta);
    if (conta.usuario.senha !== senha) {
        return response.status(401).json({mensagem: "Senha incorreta"});
    }
    if (conta.saldo < Number(valor)) {
        return response.status(404).json({mensagem: "Saldo insuficiente"});
    }
    conta.saldo -= Number(valor);
    const saque = criarRegistro(numero_conta, valor);
    dados.saques.push(saque);
    return response.status(200).json({mensagem: "Saque realizado com sucesso"});
}
function transferir(request, response) {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = request.body;
    if (!verificarExistenciaConta(numero_conta_origem)) {
        return response.status(404).json({mensagem: "Conta de origem inexistente"});
    }
    if (!verificarExistenciaConta(numero_conta_destino)) {
        return response.status(404).json({mensagem: "Conta de destino inexistente"});
    }
    const contaOrigem = buscarConta(numero_conta_origem);
    if (contaOrigem.usuario.senha !== senha) {
        return response.status(401).json({mensagem: "Senha incorreta"});
    }
    if (contaOrigem.saldo < Number(valor)) {
        return response.status(404).json({mensagem: "Saldo insuficiente"});
    }
    const contaDestino = buscarConta(numero_conta_destino);
    contaOrigem.saldo -= Number(valor);
    contaDestino.saldo += Number(valor);
    const transferencia = criarRegistroTransferencia(numero_conta_origem, numero_conta_destino, valor);
    dados.transferencias.push(transferencia);
    return response.status(200).json({mensagem: "Transferência realizada com sucesso"});
}
function consultarSaldo(request, response) {
    const { numero_conta, senha } = request.query;
    if (!verificarExistenciaConta(numero_conta)) {
        return response.status(404).json({mensagem: "Conta inexistente"});
    }
    const conta = buscarConta(numero_conta);
    if (conta.usuario.senha !== senha) {
        return response.status(401).json({mensagem: "Senha incorreta"});
    }
    return response.status(200).json({mensagem: conta.saldo});
}
function consultarExtrato(request, response) {
    const { numero_conta, senha } = request.query;
    if (!verificarExistenciaConta(numero_conta)) {
        return response.status(404).json({mensagem: "Conta inexistente"});
    }
    const conta = buscarConta(numero_conta);
    if (conta.usuario.senha !== senha) {
        return response.status(401).json({mensagem: "Senha incorreta"});
    }
    const extrato = montarExtrato(numero_conta);
    return response.status(200).json(extrato);
}
export {
    listarContas,
    cadastrarConta,
    excluirConta,
    atualizarUsuario,
    depositar,
    sacar,
    transferir,
    consultarSaldo,
    consultarExtrato
};