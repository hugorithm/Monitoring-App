var ping = require("net-ping");
const logs = require("../database/funcoes_logs");
const dns = require("dns");
var session = ping.createSession();

var exports = (module.exports = {});

exports.send_ping = function(target, io) {
  dns.lookup(target, (err, address) => {
    session.pingHost(address, function(error, address, sent, rcvd) {
      var ms = rcvd - sent;
      if (error) {
        ms = -1;
        //io.emit("ping_time_base", { username: target, pingtime: ms });
        io.emit("ping_time", { name: target, model: [{ data: sent, ping:ms}] });
      } else {
        io.emit("ping_time", { username: target, pingtime: ms });
        var obj = buildObj(target, ms, sent, rcvd);
        //logs.create_user(obj);
      }
    });
  });
};

function buildObj(nome, ping, data_enviado, data_recebido) {
  var obj = new Object();
  obj.nome = nome;
  obj.ping = ping;
  obj.data_enviado = data_enviado;
  obj.data_recebido = data_recebido;
  return obj;
}
