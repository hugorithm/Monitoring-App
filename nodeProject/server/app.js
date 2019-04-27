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

//inicializarbd();
startup();

//ver como funciona o var entry

async function buildDataReact() {
    var obj = [];
   await controlo.listar_servicos().then( async function (data) {
        for (var entry of data) {
            var servico = new Object;
            var nome = entry.nome;
            servico.key = nome;
            var dados = [];
            
        await logs.pingsapi(nome+".com").then(function (pings) {
                for(var i = 0; i<pings.length; i++) {
                    var entrada = new Object;
                    entrada.data = pings[i].json.data_recebido;
                    entrada.ping = pings[i].json.ping;
                    dados.push(entrada);
                    servico.data = dados;
                    console.log(servico);
                }
                servico.data = dados;
                obj.push(servico);
            })
        }
    })
    console.log(obj);
}


function startup() {
    buildDataReact();
    //ir buscar lista de serviços
    controlo.listar_servicos(function (data) {
        //inicializa um objeto com a lista
        var a = new Object(data);
        //itera sobre os elementos da lista
        for (var i = 0; i < a.length; i++) {
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

function toCron(time) {
    var crontime = '*/' + time + ' * * * * *'
    return crontime;
}

function inicializarbd() {
    var servico = new Object();
    servico.nome = "youtube"
    servico.tipo = "website"
    servico.class = "dunno"
    servico.propriedade = "wut"
    servico.tempo_verificacao = "1"
    controlo.criar_servico(servico);

    var servico2 = new Object();
    servico2.nome = "google"
    servico2.tipo = "website"
    servico2.class = "dunno"
    servico2.propriedade = "wut"
    servico2.tempo_verificacao = "2"
    controlo.criar_servico(servico2);

    var servico3 = new Object();
    servico3.nome = "twitter"
    servico3.tipo = "website"
    servico3.class = "dunno"
    servico3.propriedade = "wut"
    servico3.tempo_verificacao = "5"
    controlo.criar_servico(servico3);
}