var ping = require("net-ping");
const teste = require('./teste');

var exports = module.exports = {}

var session = ping.createSession();

exports.send_ping = function(target, io){
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