const router = require('./avaliacaoroute');
const routerAvaliacao = require('./avaliacaoroute');
module.exports = (app, express)=> {
    app.use(express.json());
    app.use(express.urlencoded({ extended:true }));
    app.use(routerAvaliacao);
};