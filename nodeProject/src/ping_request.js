var ping = require("net-ping");
const teste = require('./teste')
var session = ping.createSession();
const io = require("socket.io")(server)

var exports = module.exports = {}
var target = "172.217.16.238";
exports.ping_host = function(){

session.pingHost (target, function (error, target, sent, rcvd) {
    var ms = rcvd - sent;
    msf = "" + ms;
     if (error)
     {
         msf = -1;
         io.emit('ping_time', {username: "ping", pingtime : msf});
     }
     else
     {
         io.emit('ping_time', {username: "ping", pingtime : msf});
         //introduz dados do ping no mongo xD
         var a = teste.create_user('Google', msf);
         teste.save_user(a);
     }
 });
}