//const router = require(`express`).Router;
const { Router} = require('express');
const router = Router();
const tarefaController = require('../controllers/tarefaController');

// get post put delete

router.get('/tarefas', (req, res)=> {
    const listaTarefas = tarefaController.buscar();
    listaTarefas.then(tarefas => res.status(200).json(tarefas))
    .catch(error => res.status(400).json(error.message));
})

router.post('/tarefas', (req, res)=> {
    const novaTarefa = req.body;
    const tarefa = tarefaController.criar(novaTarefa);
    tarefa.then(tarefaCriada => res.status(201).json(tarefaCriada))
    .catch(error => res.status(400).json(error.message));
});

router.put('/tarefa/:id', (req, res)=> {
    const { id } = req.params;
    const tarefaAtualizada = req.body;
    const tarefa = tarefaController.atualizar(
        tarefaAtualizada, 
        id
    );
    tarefa
    .then(resulttarefaAtualizada => res.status(200).json(resulttarefaAtualizada))
    .catch(error => res.status(400).json(error.message));
});

router.delete('/tarefa/:id', (req, res)=> {
    const { id } = req.params;
    const tarefa = tarefaController.apagar(id);
    tarefa
    .then(resulttarefaDeletada => res.status(200).json(resulttarefaDeletada))
    .catch(error => res.status(400).json(error.message));
});


module.exports = router;