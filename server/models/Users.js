const banco = require("../db.js");

const todosClientes = async () => {
    const con = await banco.conectar();
    const [linhas] = await con.query("SELECT * FROM usuarios");

    return await linhas;
};

const inserirCliente = async cliente => {
    const con = await banco.conectar();
    const sql =
        "INSERT INTO usuarios(nomeCompleto, nomeUsuario, genero, idade, email, senha) VALUES(?,?,?,?,?,?)";
    const valores = [
        cliente.nomeCompleto,
        cliente.nomeUsuario,
        cliente.genero,
        cliente.idade,
        cliente.email,
        cliente.senha
    ];
    await con.query(sql, valores);
};

module.exports = { todosClientes, inserirCliente };