var ping = require("net-ping");
const teste = require('./funcoes_logs');
const dns = require('dns');

var exports = module.exports = {}

var session = ping.createSession();

exports.send_ping = function (target, io) {
    dns.lookup(target, (err, address) => {
        session.pingHost(address, function (error, address, sent, rcvd) {
            var ms = rcvd - sent;
            msf = "" + ms;
            if (error) {
                msf = -1;
                io.emit('ping_time', { username: target, pingtime: msf });
            }
            else {
                io.emit('ping_time', { username: target, pingtime: msf });
            }
        });
    });
}