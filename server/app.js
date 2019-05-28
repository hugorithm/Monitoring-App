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
    client.on("send_form_data", function(nome, endereco, tipo, classe, propriedade, tempo){
        //decidir se damos map no react ou aki
        //criar_api(dados)
        //deve estar a funcionar
    });
    client.on("editar_dados_api", function(nomeapi, novosdados){
        //same historia de cima
        //editar_dados_api(nomeapi, novosdados);
        //deve estar a dar
    })
    client.on("stop_cron", function(){
        servicos.stop_cron();
    })
    client.on("start_cron", function(){
        servicos.start_cron(io, controlo, logs);
    })
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
    //construirBd();
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
    controlo.criar_api(servico);

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
    controlo.criar_api(servico1);
    
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
    controlo.criar_api(servico2);

    var servico3 = new Object();
    servico3.nome = "Twitter"
    servico3.endereco = "www.twitter.com"
    servico3.classe = "classe3"
    servico3.propriedade = "propriedade3"
    servico3.tipo = "Website"
    servico3.tipo_verificacao = ["Http, Ping"]
    servico3.tempo_verificacao = "5"
    servico3.valor_minimo = 5;
    servico3.valor_maximo = 100;
    servico3.duracao_erro = 20000;//ms
    servico3.percentagem_erro = 80;
    servico3.estado = "Visivel"
    servico3.cod_funcional = ["200"];
    servico3.cod_nao_funcional = ["400", "301", "404"];
    controlo.criar_api(servico3);
    
    var servico4 = new Object();
    servico4.nome = "Stack Overflow"
    servico4.endereco = "www.stackoverflow.com"
    servico4.classe = "classe3"
    servico4.propriedade = "propriedade3"
    servico4.tipo = "Website"
    servico4.tipo_verificacao = ["Http, Ping"]
    servico4.tempo_verificacao = "2"
    servico4.valor_minimo = 5;
    servico4.valor_maximo = 100;
    servico4.duracao_erro = 20000;//ms
    servico4.percentagem_erro = 80;
    servico4.estado = "Visivel"
    servico4.cod_funcional = ["200"];
    servico4.cod_nao_funcional = ["400", "301", "404"];
    controlo.criar_api(servico4);
    
    var servico5 = new Object();
    servico5.nome = "Github"
    servico5.endereco = "www.github.com"
    servico5.classe = "classe3"
    servico5.propriedade = "propriedade3"
    servico5.tipo = "Website"
    servico5.tipo_verificacao = ["Ping"]
    servico5.tempo_verificacao = "2"
    servico5.valor_minimo = 5;
    servico5.valor_maximo = 100;
    servico5.duracao_erro = 20000;//ms
    servico5.percentagem_erro = 80;
    servico5.estado = "Visivel"
    servico5.cod_funcional = ["200"];
    servico5.cod_nao_funcional = ["400", "301", "404"];
    controlo.criar_api(servico5);

    var servico6 = new Object();
    servico6.nome = "Uminho"
    servico6.endereco = "alunos.uminho.pt"
    servico6.classe = "classe3"
    servico6.propriedade = "propriedade3"
    servico6.tipo = "Website"
    servico6.tipo_verificacao = ["Http, Ping"]
    servico6.tempo_verificacao = "5"
    servico6.valor_minimo = 5;
    servico6.valor_maximo = 100;
    servico6.duracao_erro = 20000;//ms
    servico6.percentagem_erro = 80;
    servico6.estado = "Visivel"
    servico6.cod_funcional = ["200"];
    servico6.cod_nao_funcional = ["400", "301", "404"];
    controlo.criar_api(servico6);

    var servico7 = new Object();
    servico7.nome = "Gitlab"
    servico7.endereco = "about.gitlab.com"
    servico7.classe = "classe3"
    servico7.propriedade = "propriedade3"
    servico7.tipo = "Website"
    servico7.tipo_verificacao = ["Http, Ping"]
    servico7.tempo_verificacao = "5"
    servico7.valor_minimo = 5;
    servico7.valor_maximo = 100;
    servico7.duracao_erro = 20000;//ms
    servico7.percentagem_erro = 80;
    servico7.estado = "Visivel"
    servico7.cod_funcional = ["200"];
    servico7.cod_nao_funcional = ["400", "301", "404"];
    controlo.criar_api(servico7);
}

function editar_dados_api(nomeapi, novosdados){
    controlo.editar_dados_api(nomeapi, novosdados);
}

function criar_api(dadosapi){
    controlo.criar_api(dadosapi);
}