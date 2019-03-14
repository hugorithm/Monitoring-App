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
         var a = JSON.stringify({api_name : 'google', sentdata : sent, receiveddata : rcvd, ping : msf});
         var b = teste.create_user(a);
         var c = teste.save_user(b);
         var d = teste.getjson_teste(c);
         console.log(d);
         //alert(a.creditrequest[0].id);
     }
 });
}