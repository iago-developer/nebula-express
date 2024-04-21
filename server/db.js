const conectar = async () => {
    if (global.conexao && global.conexao.state != "disconected")
        return global.conexao;
    const mysql = require("mysql2/promise");
    const con = mysql.createConnection("mysql://root:@localhost:3306/Banco");
    console.log("Banco de Dados conectado com sucesso!");
    global.conexao = con;
    return con;
};

module.exports = { conectar };