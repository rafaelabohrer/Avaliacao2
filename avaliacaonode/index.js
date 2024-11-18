const express = require('express');
const app = express();
const port = 5000;
const router = require('./routers/index');
const conexao = require('./infraestrutura/conexao');
const tabelas = require('./infraestrutura/tabelas');
const cors = require('cors');


app.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Include credentials if needed
}));
tabelas.init(conexao);

router(app, express);
app.use(express.json());



app.listen(port, (error) =>{
    if(error) {
        console.log(`Deu erro`);
        return;
    }
    console.log(`ta rodando beleza`)
})