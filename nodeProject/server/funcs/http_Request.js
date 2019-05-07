const http = require('http');
var exports = module.exports = {}

exports.send_http_request = function (nome, link, logs, callback) {
    var data_inicio = new Date().getTime();

    http.get("http://" + link , (resp) => {
        let data = '';
        var data_fim = "";

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
            if(data_fim == ""){
                data_fim = new Date().getTime();
            }
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            if(data_fim == ""){
                data_fim = new Date().getTime();
            }
            var latencia = data_fim - data_inicio;
            var obj = buildObj(nome, link, data_inicio, data_fim, latencia, resp.statusCode);
            logs.create_user(obj);
            callback();
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

function buildObj(nome, endereco, data_enviado, data_recebido, ping, statusCode) {
	var obj = new Object();
	obj.nome = nome;
	obj.endereco = endereco;
	obj.tipo = "Http";
	obj.data_enviado = data_enviado;
	obj.data_recebido = data_recebido;
    obj.latencia = ping;
    obj.statusCode = statusCode;
	return obj;
}