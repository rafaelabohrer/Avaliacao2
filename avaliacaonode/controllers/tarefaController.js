const tarefaModel = require("../models/tarefaModel");

class TarefaController {
    buscar(){
        return tarefaModel.listar();
    }
    criar(novaTarefa){
        return tarefaModel.criar(novaTarefa);
    }
    atualizar(tarefaAtualizada, id){
        return tarefaModel.atualizar(tarefaAtualizada, id);
    }
    apagar(id){
        return tarefaModel.apagar(id);
    }
}

module.exports = new TarefaController();
