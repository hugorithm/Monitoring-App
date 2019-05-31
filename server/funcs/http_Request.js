const http = require('http');
const https = require('https')
var exports = module.exports = {}


var util = require('util')

exports.send_http_request = async function (objeto, callback) {
    var data_inicio = new Date().getTime();

    https.get("https://" + objeto.endereco, async (resp) => {
        var data_fim = "";
        var data = "";

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            if (data_fim == "") {
                data_fim = new Date().getTime();
            }
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            if (data_fim == "") {
                data_fim = new Date().getTime();
            }

            var latencia = data_fim - data_inicio;
            callback(objeto.nome, objeto.endereco, "Http", data_inicio, data_fim, latencia, resp.statusCode);
        });

    }).on("error", (err) => {
        callback(objeto.nome, objeto.endereco, "Http", data_inicio, data_inicio, 0, err.code);
    });
}