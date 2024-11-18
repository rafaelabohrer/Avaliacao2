class Tabelas {
        init(conexao){
            this.conexao = conexao;
            this.criarTabelaTarefas();
        }

    criarTabelaTarefas(){
        const sql = 
        `
        CREATE TABLE IF NOT EXISTS tarefas (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        prioridade VARCHAR(255) NOT NULL,
        tarefa VARCHAR (255) NOT NULL);
        `;
    this.conexao.query(sql, (error) => {
        if(error){
            console.log('deu erro na criacao da tabela'  + error);
            return;
        }
        console.log('tabela criada');
    });
    }
}
module.exports = new Tabelas();