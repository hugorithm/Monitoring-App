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
        //var np = new Array('google', msf, sent, rcvd);
         var a = JSON.stringify({api_name : 'google', response_time : msf});
         var b = teste.create_user(a);
         var c = teste.save_user(b);
         var d = teste.getjson_teste(c);
         console.log(d);
     }
 });
}