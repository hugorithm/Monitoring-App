const express = require('express');
const app = express();
const servicos = require('./servicos');
const logs = require('./funcoes_logs');
const controlo = require('./funcoes_controlo');

//set the template engine ejs
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));

//routes
app.get('/', (req, res) => {
    res.render('index')
});

//Listen on port 3000
server = app.listen(3000);

//socket.io instantiation.
const io = require("socket.io")(server);

var servicos_lista = controlo.listar_servicos();
console.log(servicos_lista);