const mysql = require('mysql');


const conexao = mysql.createConnection({
   host: 'localhost',
   port:'3306',
   user: 'root',
   password: 'ceci1507',
   database: 'mydatabase'
})

module.exports = conexao;