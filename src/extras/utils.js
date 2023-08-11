import dados from "../dados/bancodedados.js";
let identificador = 1;
function verificarExistenciaUsuario(cpf, email) {
    let conta = dados.contas.find(conta => conta.usuario.cpf === cpf);
    if (conta) { return true; }
    conta = dados.contas.find(conta => conta.usuario.email === email);
    if (conta) { return true; }
    return false;
}
function atualizarDadosUsuario(numeroConta, nome, email, cpf, data_nascimento, telefone, senha) {
    const conta = buscarConta(numeroConta);
    if (nome) { conta.usuario.nome = nome; }
    if (email) { conta.usuario.email = email; }
    if (cpf) { conta.usuario.cpf = cpf; }
    if (data_nascimento) { conta.usuario.data_nascimento = data_nascimento; }
    if (telefone) { conta.usuario.telefone = telefone; }
    if (senha) { conta.usuario.senha = senha; }
}
function verificarExistenciaConta(numeroConta) {
    const conta = dados.contas.find(conta => conta.numero === Number(numeroConta));
    return (conta) ? true : false;
}
function criarConta(nome, email, cpf, data_nascimento, telefone, senha) {
    return {
        numero: identificador++,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento: formatarData(data_nascimento),
            email,
            telefone,
            senha
        }
    }
}
function buscarIndexConta(numeroConta) {
    return dados.contas.findIndex(conta => conta.numero === Number(numeroConta));
}
function buscarConta(numeroConta) {
    return dados.contas.find(conta => conta.numero === Number(numeroConta));
}
function formatarData(data) {
    const dados = data.split("/");
    const novaData = new Date(Number(dados[2]), Number(dados[1]), Number(dados[0]));
    return `${novaData.getFullYear()}-${novaData.getMonth().toString().padStart(2, "0")}-${novaData.getDate().toString().padStart(2, "0")}`;
}
function getDataOperacao() {
    const data = new Date();
    const dia = `${data.getFullYear()}-${(data.getMonth() + 1).toString().padStart(2, "0")}-${data.getDate().toString().padStart(2, "0")}`;
    const hora = `${data.getHours().toString().padStart(2, "0")}:${data.getMinutes().toString().padStart(2, "0")}:${data.getSeconds().toString().padStart(2, "0")}`;
    return `${dia} ${hora}`;
}
function criarRegistro(numero_conta, valor) {
    return {
        data: getDataOperacao(),
        numero_conta,
        valor
    };
}
function criarRegistroTransferencia(numero_conta_origem, numero_conta_destino, valor) {
    return {
        data: getDataOperacao(),
        numero_conta_origem,
        numero_conta_destino,
        valor
    };
}
function montarExtrato(numero_conta){
    const depositos = dados.depositos.filter(registro => registro.numero_conta === numero_conta);
    const saques = dados.saques.filter(registro => registro.numero_conta === numero_conta);
    const transferenciasEnviadas = dados.transferencias.filter(registro => registro.numero_conta_origem === numero_conta);
    const transferenciasRecebidas = dados.transferencias.filter(registro => registro.numero_conta_destino === numero_conta);
    return {
        depositos,
        saques,
        transferenciasEnviadas,
        transferenciasRecebidas
    };
}
export {
    verificarExistenciaUsuario,
    atualizarDadosUsuario,
    verificarExistenciaConta,
    criarConta,
    buscarIndexConta,
    buscarConta,
    criarRegistro,
    criarRegistroTransferencia,
    montarExtrato
};