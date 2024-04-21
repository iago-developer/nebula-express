const banco = require('../db.js');

banco.connect((err) => {
  if(err) throw err;
  const sql = 'SELECT * FROM usuarios;';
  banco.query(sql, (err, result) => {
    console.log(result);
  });
  banco.end((err) => {
    if(err) throw err;
    console.log('Conexao encerrada!');
  });
});