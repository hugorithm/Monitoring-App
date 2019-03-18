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
            console.log('GET Request: ' + resp.statusCode + ' ' + JSON.parse(data).explanation);
        });

        //POST Request
        const dados = JSON.stringify({
            tasks: 'Buy the milk'
        })

        const options = {
            hostname: 'http://127.0.0.1',
            port: 8080,
            path: '/tasks',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': dados.length
            }
        }

        const req = http.request(options, (res) => {
            console.log(`statusCode: ${res.statusCode}`)

            res.on('data', (d) => {
                process.stdout.write(d)
            })
        })

        req.on('error', (error) => {
            console.error(error)
        })

        req.write(dados)
        req.end()

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}