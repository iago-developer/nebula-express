var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var conexao = require("../models/Users.js");

/* Database conection */
(async () => {
    const clientes = await conexao.todosClientes();
    console.group(`Usuários cadastrados:`);
    console.log(clientes);
    console.groupEnd();
})();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", {
        title: "Express",
        erroLogin: false
    });
});

router.get("/main", (req, res) => {
    const err = null;
    res.render("formLogin", { err });
});

router.get("/formCadastro", (req, res) => {
    const err = null;
    const nomeUsuario = null;
    const email = null;
    res.render("formCadastro", { nomeUsuario, email, err });
});

router.get("/formUpdate", async (req, res) => {
    const clientes = await conexao.todosClientes();
    const id = null;
    const err = null;
    const nomeUsuario = null;
    const email = null;
    res.render("formUpdate", { clientes, id, nomeUsuario, email, err });
});

router.get("/formLogin", (req, res) => {
    const err = null;
    res.render("formLogin", { err });
});

router.post("/main", async (req, res) => {
    /* Página de acesso */
    let login = req.body.nomeUsuario;
    let senha = req.body.senha;

    const clientes = await conexao.todosClientes();
    const todosClientes = await conexao.todosClientes();
    const buscaCliente = cliente =>
        cliente.nomeUsuario == login && cliente.senha == senha;
    const clienteLogado = clientes.find(buscaCliente);
    if (clienteLogado) {
        console.log(
            `O usuário: (${login}) está localizado em nosso banco de dados!`
        );
        console.log("Acesso concedido!");
        const err = null;
        res.render("main", {
            clienteLogado,
            todosClientes,
            title: "Nebula",
            err
        });
    } else {
        console.log(
            `O usuário ou a senha não está localizado em nosso banco de dados!`
        );
        console.log("Acesso Negado!");
        const err = "error!";
        res.render("formLogin", { title: "formLogin", err });
    }
});

router.post("/formUpdate", async (req, res) => {
    try {
        const clientes = await conexao.todosClientes();
        const { id, nomeUsuario, email, senha } = req.body;
        const todosClientes = await conexao.todosClientes();
        const buscaCliente = cliente => cliente.id == id;
        const clienteLogado = clientes.find(buscaCliente);
        if (clienteLogado) {
            console.log(
                `O usuário: (${login}) está localizado em nosso banco de dados!`
            );
            console.log("Acesso concedido!");
        }
        res.render("formUpdate", { clienteLogado, err });
    } catch (err) {
        const clientes = await conexao.todosClientes();
        const { id, nomeUsuario, email, senha } = req.body;
        const todosClientes = await conexao.todosClientes();
        const buscaCliente = cliente => cliente.id == id;
        const clienteLogado = clientes.find(buscaCliente);
        const cliente = [id, nomeUsuario, email, senha];
        res.render("formUpdate", { clienteLogado, err });
    }
});

router.post("/update", async (req, res) => {
    try {
        const { id, nomeCompleto, nomeUsuario, genero, idade, email, senha } =
            req.body;
        const clientes = await conexao.todosClientes();
        const todosClientes = await conexao.todosClientes();
        const buscaCliente = cliente => cliente.id == id;
        const clienteLogado = clientes.find(buscaCliente);
        const cliente = [id, nomeUsuario, email, senha];

        await conexao.atualizarCliente(
            {
                nomeCompleto: nomeCompleto,
                nomeUsuario: nomeUsuario,
                genero: genero,
                idade: idade,
                email: email,
                senha: senha
            },
            id
        );

        const clientesUpdate = await conexao.todosClientes();
        console.group("Dados atualizados com sucesso!");
        console.log(clientesUpdate);
        console.groupEnd();
        const err = null;
        clienteLogado.nomeUsuario = "iago_xd";
        clienteLogado.senha = "123";
        res.render("main", {
            clienteLogado,
            todosClientes,
            title: "Nebula",
            err
        });
    } catch (err) {
        const { id, nomeCompleto, nomeUsuario, genero, idade, email, senha } =
            req.body;
        const cliente = [
            id,
            nomeCompleto,
            nomeUsuario,
            genero,
            idade,
            email,
            senha
        ];
        const clientes = await conexao.todosClientes();
        const todosClientes = await conexao.todosClientes();
        const buscaCliente = cliente => cliente.id == id;
        const clienteLogado = clientes.find(buscaCliente);
        res.render("index", { clienteLogado, nomeUsuario, email, err });
    }
});

router.post("/delete", async (req, res) => {
    try {
        const clientes = await conexao.todosClientes();
        const { id, nomeUsuario, email, senha } = req.body;
        const todosClientes = await conexao.todosClientes();
        const buscaCliente = cliente => cliente.id == id;
        const clienteLogado = clientes.find(buscaCliente);
        const err = "reload!";
        await conexao.deletarCliente(clienteLogado.id);

        res.render("formLogin", { err });
    } catch (err) {
        return "Falha ao deletar Cliente!";
    }
});

router.post("/formLogin", async (req, res) => {
    /* Página de Cadastro */
    try {
        const clientes = await conexao.todosClientes();

        const {
            nomeCompleto,
            nomeUsuario,
            genero,
            idade,
            email,
            senha,
            c_senha
        } = req.body;
        if (senha != c_senha) {
            const err = "erro de senha!";
            const nomeUsuario = null;
            const email = null;
            res.render("formCadastro", { nomeUsuario, email, err });
        } else {
            await conexao.inserirCliente({
                nomeCompleto: nomeCompleto,
                nomeUsuario: nomeUsuario,
                genero: genero,
                idade: idade,
                email: email,
                senha: senha
            });
            const clientesUpdate = await conexao.todosClientes();
            console.group("Dados inseridos com sucesso!");
            console.table(clientesUpdate);
            console.groupEnd();
            const err = "safe!";
            res.render("formLogin", { nomeUsuario, email, err });
        }
    } catch (err) {
        const { nomeCompleto, nomeUsuario, genero, idade, email, senha } =
            req.body;
        const cliente = [
            nomeCompleto,
            nomeUsuario,
            genero,
            idade,
            email,
            senha
        ];
        res.render("formCadastro", { nomeUsuario, email, err });
    }
});

module.exports = router;
