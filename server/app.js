const express = require('express');
const app = express();

const servicos = require('./servicos');
const logs = require('./database/funcoes_logs');
const controlo = require('./database/funcoes_controlo');

//Listen on port 3000
server = app.listen(3000);

//socket.io instantiation.
const io = require("socket.io")(server);


io.on("connect", (client) =>{
    console.log("client connected");
    client.on("request_data_from_server", async function(){
        servicos.emitir_dados_ligaçao(controlo, logs);
    });
    client.on("send_form_data", async function(nome, endereco, tipo, classe, propriedade, tempo){
        console.log(nome, endereco, tipo, classe, propriedade, tempo);

    });
});




var teste = require('./funcs/mongodb_Request');
teste.send_mongodb_request("nome", "mongodb://localhost:27017", "amsa", "requests", "{}", async function(latencia){
    console.log("lat " + latencia)
})

startup();

function startup() {
    iniciarMonitor();
    //construirBd();
}

var teste_mongo = new Object();
teste_mongo.nome = "Local";
teste_mongo.link = "mongodb://localhost:27017";
teste_mongo.dbname = "amsa";
teste_mongo.collection = "servicos";

var mongo_request = require("./funcs/mongodb_Request");
mongo_request.send_mongodb_request(teste_mongo, "{}", function(obj, dados){
    console.log(JSON.stringify(obj, dados));
    //io.emit("update_Mongodb_data", dados);
});



function iniciarMonitor() {
    controlo.listar_servicos().then(function (data){
        //inicializa um objeto com a lista
        var a = new Object(data);
        //itera sobre os elementos da lista
        for (var i = 0; i < a.length; i++) {
            //definiçao de vars relativas aos dados de cada elemento
            var nome = a[i].nome;
            var endereco = a[i].endereco;
            var tipo = a[i].tipo;
            var classe = a[i].class;
            var propriedade = a[i].propriedade;
            var tempo = a[i].tempo_verificacao;

            var crontime = toCron(tempo);
            //iniciacao de servicos de monitorizacao por cada elemento
            servicos.verificar_disponibilidade(tipo, nome, endereco, io, crontime, controlo, logs);
            
        }
    });
}

function toCron(time) {
    var crontime = '*/' + time + ' * * * * *'
    return crontime;
}

function construirBd() {
    var servico = new Object();
    servico.nome = "youtube"
    servico.endereco = "www.youtube.com"
    servico.tipo = "website"
    servico.class = "dunno"
    servico.propriedade = "wut"
    servico.tempo_verificacao = "1"
    controlo.criar_servico(servico);

    var servico2 = new Object();
    servico2.nome = "google"
    servico2.endereco = "www.google.com" 
    servico2.tipo = "website"
    servico2.class = "dunno"
    servico2.propriedade = "wut"
    servico2.tempo_verificacao = "2"
    controlo.criar_servico(servico2);

    var servico3 = new Object();
    servico3.nome = "twitter"
    servico3.endereco = "www.twitter.com"
    servico3.tipo = "website"
    servico3.class = "dunno"
    servico3.propriedade = "wut"
    servico3.tempo_verificacao = "5"
    controlo.criar_servico(servico3);
}