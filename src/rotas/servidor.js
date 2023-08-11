import express from "express";
import {
    validarConta,
    validarSenhaBanco,
    validarNumeroConta,
    validarDeposito,
    validarSaque,
    validarTransferencia,
    validarConsulta
} from "../intermediarios/filtros.js";
import {
    listarContas,
    cadastrarConta,
    excluirConta,
    atualizarUsuario,
    depositar,
    sacar,
    transferir,
    consultarSaldo,
    consultarExtrato
} from "../controladores/operacoes.js";
const app = express();
app.use(express.json());
app.get("/contas", validarSenhaBanco, listarContas);
app.post("/contas", validarConta, cadastrarConta);
app.delete("/contas/:numeroConta", validarNumeroConta, excluirConta);
app.put("/contas/:numeroConta/usuario", validarNumeroConta, atualizarUsuario);
app.post("/contas/depositar", validarDeposito, depositar);
app.post("/contas/sacar", validarSaque, sacar);
app.post("/contas/transferir", validarTransferencia, transferir);
app.get("/contas/saldo", validarConsulta, consultarSaldo);
app.get("/contas/extrato", validarConsulta, consultarExtrato);
export default app;