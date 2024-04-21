var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var conexao = require("../models/Users.js");

/* Database conection */
(async () => {
    const clientes = await conexao.todosClientes();
    console.group(`Usuários cadastrados:`);
    console.table(clientes);
    console.groupEnd();
})();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", {
        title: "Express",
        erroLogin: false
    });
});

router.get("/main", (req,res) => {
  const err = null;
  res.render("formLogin", { err });
});

router.get("/formCadastro", (req, res) => {
    const err = null;
    const nomeUsuario = null;
    const email = null;
    res.render("formCadastro", { nomeUsuario, email, err });
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
    const buscaCliente = cliente =>
        cliente.nomeUsuario == login && cliente.senha == senha;
    const clienteLogado = clientes.find(buscaCliente);
    if (clienteLogado) {
        console.log(
            `O usuário: (${login}) está localizado em nosso banco de dados!`
        );
        console.log("Acesso concedido!");
        const err = null;
        res.render("main", { clienteLogado, title:"Nebula", err });
    } else {
        console.log(
            `O usuário ou a senha não está localizado em nosso banco de dados!`
        );
        console.log("Acesso Negado!");
        const err = "error!";
        res.render("formLogin", { title:"formLogin", err });
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
