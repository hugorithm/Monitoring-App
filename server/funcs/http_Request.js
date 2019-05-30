const http = require('http');
var exports = module.exports = {}

exports.send_http_request = function (objeto, callback) {
    var data_inicio = new Date().getTime();

    http.get("http://" + objeto.endereco , (resp) => {
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
            callback(objeto.nome, objeto.endereco, "Http", data_inicio, data_fim, latencia, resp.statusCode);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}