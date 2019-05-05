const http = require('http');
var exports = module.exports = {}

exports.send_http_request = function (link, logs) {
    var data_inicio = new Date();

    http.get("http://" + link , (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            var data_fim = new Date();
            resp.statusCode;
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}