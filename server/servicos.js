var http_request = require("./funcs/http_Request");
var ping_request = require("./funcs/ping_Request");
var mongo_request = require("./funcs/mongodb_Request");
var mysql_request = require("./funcs/myslq_Request");

var cronJob = require("cron").CronJob;

var exports = (module.exports = {});

exports.verificar_disponibilidade = function (tipo, nome, endereco, io, tempo, controlo, logs) {
	if (tipo == "api" || tipo =="website") {
		var job_api = new cronJob(tempo, function () {
			http_request.send_http_request(nome, endereco, logs, async function(){
                var dados = await exports.emitirDados("http", controlo, logs);
                io.emit("update_http_data", dados);
            });
			ping_request.send_ping_request(nome, endereco, io, logs, async function(){
                var dados = await exports.emitirDados("ping", controlo, logs);
                io.emit("update_ping_data", dados);
            });
		});
		job_api.start();
    } 
    if (tipo == "database") {
		var job_api = new cronJob(tempo, function () {
			mongo_request.send_mongodb_request(nome, endereco, logs, async function(){
                var dados = await exports.emitirDados("mongo", controlo, logs);
                io.emit("update_mongodb_data", dados);
            });
			mysql_request.send_mysql_request(nome, endereco, io, logs, async function(){
                var dados = await exports.emitirDados("mysql", controlo, logs);
                io.emit("update_mysql_data", dados);
            });
		});
		job_api.start();
	} 
};

exports.emitirDados = async function(tipo, controlo, logs) {
    var obj = [];
    await controlo.listar_servicos().then(async function (data) {
        for (var entry of data) {
            var servico = new Object;
            var nome = entry.nome;
            servico.key = nome;
            var dados = [];

            var tempo = 1*60
            await logs.pingsapi(tipo, nome, tempo).then(function (pings) {
                for (var i = 0; i < pings.length; i++) {
                    var entrada = new Object;
                    entrada.Data = pings[i].json.data_recebido;
                    entrada.Latencia = pings[i].json.latencia;
                    dados.push(entrada);
                    servico.data = dados;
                }
                servico.values = dados;
                obj.push(servico);
            })
        }
    })
    return obj;
}

exports.emitir_dados_ligaçao = async function(controlo, logs){
    var tipos = ["http", "ping", "mongo", "mysql"];
    for (var entry of tipos){
        var dados = await exports.emitirDados(entry, controlo, logs);
        console.log(JSON.stringify(dados))
        io.emit("update_"+entry+"_data", dados);
    }
}
