const http = require('http');
var exports = module.exports = {}

exports.send_http_request = function () {

    http.get('http://127.0.0.1:8080', (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log('GET Request: ' + resp.statusCode);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}