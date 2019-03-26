const express = require('express');
const app = express();
const mongoose = require('mongoose');
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

/*
var servico = new Object();
servico.nome = "youtube"
servico.tipo = "website"
servico.class = "dunno"
servico.propriedade = "wut"
servico.tempo_verificacao = "10"
controlo.criar_servico(servico);
*/

startup();

function startup() {
    var obj = new Object();
    //ir buscar lista de serviços
    controlo.listar_servicos(obj, function (data) {
        //inicializa um objeto com a lista
        var a = new Object(data);
        //itera sobre os elementos da lista
        for (var i = 0; i< a.length; i++){
            //definiçao de vars relativas aos dados de cada elemento
            var nome = a[i].nome;
            var tipo = a[i].tipo;
            var classe = a[i].class;
            var propriedade = a[i].propriedade;
            var tempo = a[i].tempo_verificacao;

            var trolha = nome + ".com";
            //iniciacao de servicos de monitorizacao por cada elemento
            servicos.verificar_disponibilidade(tipo, trolha, io, tempo);
        }
    })
}