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
        servicos.emitir_dados_ligaçao(io, controlo, logs);
    });
    client.on("send_form_data", async function(nome, endereco, tipo, classe, propriedade, tempo){
        console.log(nome, endereco, tipo, classe, propriedade, tempo);

    });
});

/* mongo request a funcionar
var teste = require('./funcs/mongodb_Request');
var obj = new Object();
obj.link = "mongodb://localhost:27017";
obj.dbname = "amsa";
obj.collection = "requests";
obj.name = "nome"
teste.send_mongodb_request(obj, "{}", async function(dados){
    console.log("lat " + JSON.stringify(dados.latencia))
})*/
/*
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
*/

startup();

function startup() {
    iniciarMonitor();
    // construirBd();
}

function iniciarMonitor() {
    servicos.iniciar_verificacao_geral(io, controlo, logs);
}

function construirBd() {
    var servico = new Object();
    servico.nome = "Youtube"
    servico.endereco = "www.youtube.com"
    servico.classe = "classe1"
    servico.propriedade = "propriedade1"
    servico.tipo = "Website";
    servico.tipo_verificacao = ["Ping", "Http"];
    servico.tempo_verificacao = "2";
    servico.valor_minimo = 5;
    servico.valor_maximo = 100;
    servico.duracao_erro = 20000;//ms
    servico.percentagem_erro = 80;
    servico.estado = "Visivel";
    servico.cod_funcional = ["200"];
    servico.cod_nao_funcional = ["400", "301", "404"];
    controlo.criar_servico(servico);

    var servico1 = new Object();
    servico1.nome = "Google"
    servico1.endereco = "www.google.com"
    servico1.classe = "classe2"
    servico1.propriedade = "propriedade2"
    servico1.tipo = "Website"
    servico1.tipo_verificacao = ["Ping"]
    servico1.tempo_verificacao = "5"
    servico1.valor_minimo = 5;
    servico1.valor_maximo = 100;
    servico1.duracao_erro = 20000;//ms
    servico1.percentagem_erro = 80;
    servico1.estado = "Visivel"
    servico1.cod_funcional = ["200"];
    servico1.cod_nao_funcional = ["400", "301", "404"];
    controlo.criar_servico(servico1);
    
    var servico2 = new Object();
    servico2.nome = "Twitch"
    servico2.endereco = "www.twitch.tv"
    servico2.classe = "classe3"
    servico2.propriedade = "propriedade3"
    servico2.tipo = "Website"
    servico2.tipo_verificacao = ["Http"]
    servico2.tempo_verificacao = "1"
    servico2.valor_minimo = 5;
    servico2.valor_maximo = 100;
    servico2.duracao_erro = 20000;//ms
    servico2.percentagem_erro = 80;
    servico2.estado = "Visivel"
    servico2.cod_funcional = ["200"];
    servico2.cod_nao_funcional = ["400", "301", "404"];
    controlo.criar_servico(servico2);
}