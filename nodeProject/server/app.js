const express = require('express');
const app = express();

const servicos = require('./funcs/servicos');
const logs = require('./database/funcoes_logs');
const controlo = require('./database/funcoes_controlo');

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
servico.tempo_verificacao = "1"
controlo.criar_servico(servico);
*/

startup();

function buildDataReact(){
    var obj = [];
    controlo.listar_servicos(function (data){
        for (var entry in data){
            var servico = new Object;
            var nome = entry.nome;
            servico.key = nome;
            var dados = [];
            logs.pingsapi(nome, function (pings){
                for (var ping in pings){
                    var entrada = new Object;
                    entrada.data = ping.data;
                    entrada.ping = ping.ping;
                    dados.push(entrada);
                }
            })
            obj.push(servico);
        }
    })
    console.log(obj);
}

function startup() {
    //buildDataReact();
    //ir buscar lista de serviços
    controlo.listar_servicos(function (data) {
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
            var crontime = toCron(tempo);
            //iniciacao de servicos de monitorizacao por cada elemento
            servicos.verificar_disponibilidade(tipo, trolha, io, crontime);
        }
    })
}


function toCron(time){
    var crontime = '*/' + time + ' * * * * *'
    return crontime;
}