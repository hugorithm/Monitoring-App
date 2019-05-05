var http_request = require("./http_Request");
var ping_request = require("./ping_Request");

var cronJob = require("cron").CronJob;

var exports = (module.exports = {});

exports.verificar_disponibilidade = function (tipo, nome, endereco, io, tempo, controlo, logs) {
	if (tipo == "api" || tipo =="website") {
		var job_api = new cronJob(tempo, function () {
			//http_request.send_http_request();
			ping_request.send_ping_request(nome, endereco, io, logs, async function(){
                var dados = await exports.emitirDados(controlo, logs);
                io.emit("update_data", dados);
            });
		});
		job_api.start();
	}
};

exports.emitirDados = async function emitirDados(controlo, logs) {
    var obj = [];
    await controlo.listar_servicos().then(async function (data) {
        for (var entry of data) {
            var servico = new Object;
            var nome = entry.nome;
            servico.key = nome;
            var dados = [];

            var tempo = 3*60
            await logs.pingsapi(nome, tempo).then(function (pings) {
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

