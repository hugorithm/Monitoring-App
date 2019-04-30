var http_request = require("./http_Request");
var ping_request = require("./ping_request");

var cronJob = require("cron").CronJob;

var exports = (module.exports = {});

exports.verificar_disponibilidade = function (tipo, endereco, io, tempo, controlo, logs) {
	if (tipo == "api" || tipo =="website") {
		var job_api = new cronJob(tempo, function () {
			//http_request.send_http_request();
			ping_request.send_ping(endereco, io, function(){
                emitirDados(controlo, logs);
            });
		});
		job_api.start();
	} else if (tipo == "maquina") {
		var job_maquina = new cronJob(tempo, function () {
			ping_request.send_ping(endereco, io, function(){
                emitirDados(controlo, logs);
            });
		});
		job_maquina.start();
	}
};

async function emitirDados(controlo, logs) {
    var obj = [];
    await controlo.listar_servicos().then(async function (data) {
        for (var entry of data) {
            var servico = new Object;
            var nome = entry.nome;
            servico.key = nome;
            var dados = [];

            await logs.pingsapi(nome + ".com").then(function (pings) {
                for (var i = 0; i < pings.length && i<5; i++) {
                    var entrada = new Object;
                    entrada.data = pings[i].json.data_recebido;
                    entrada.ping = pings[i].json.ping;
                    dados.push(entrada);
                    servico.data = dados;
                }
                servico.data = dados;
                obj.push(servico);
            });
        }
    });
    return obj;
}