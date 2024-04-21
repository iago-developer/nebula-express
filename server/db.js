const conectar = async () => {
    if (global.conexao && global.conexao.state != "disconected")
        return global.conexao;
    const mysql = require("mysql2/promise");
    const con = mysql.createConnection("mysql://root:@localhost:3306/Banco");
    console.log("Banco de Dados conectado com sucesso!");
    global.conexao = con;
    return con;
};

conectar();

const todosClientes = async () => {
  const con = await conectar();
  const [linhas] = await con.query('SELECT * FROM usuarios');
  
  return await linhas;
}

const inserirCliente = async (cliente) => {
  const con = await conectar();
  const sql = 'INSERT INTO usuarios(nomeCompleto, nomeUsuario, genero, idade, email, senha) VALUES(?,?,?,?,?,?)';
  const valores = [cliente.nomeCompleto, cliente.nomeUsuario, cliente.genero, cliente.idade, cliente.email, cliente.senha];
  await con.query(sql, valores);
}

module.exports = {todosClientes, inserirCliente};
