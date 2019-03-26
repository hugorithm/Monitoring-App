var http_request = require('./http_Request');
var ping_request = require('./ping_request');

var cronJob = require('cron').CronJob;


var exports = module.exports = {};

exports.verificar_disponibilidade = function(tipo, endereco, io, tempo){
    if (tipo == "api") {
        var job_api = new cronJob(tempo, function () {
            http_request.send_http_request();
            ping_request.send_ping(endereco, io);
        });
        job_api.start();
    }
    else if (tipo == "website") {
        var job_website = new cronJob(tempo, function () {
            http_request.send_http_request();
            //ping_request.send_ping(endereco, io);
        });
        job_website.start();
    }
    else if (tipo == "maquina") {
        var job_maquina = new cronJob(tempo, function () {
            ping_request.send_ping(endereco, io);
        });
        job_maquina.start();
    }
}