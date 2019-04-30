var ping = require("net-ping");
const logs = require("../database/funcoes_logs");
const dns = require("dns");
var session = ping.createSession();

var exports = (module.exports = {});


const util = require('util');
const dnslookup = util.promisify(dns.lookup);

exports.send_ping = async function (target, io, callback) {
	var address = await dnslookup(target);

	var data = await session.pingHost(address.address, async function (error, address, sent, rcvd) {
		var ms = rcvd - sent;
		var a;
		if (error) {
			ms = -1;
			//io.emit("ping_time_base", { username: target, pingtime: ms });
			io.emit("ping_time", { name: target, model: [{ data: sent, ping: ms }] });
		} else {
			io.emit("ping_time", { username: target, pingtime: ms });
			var obj = buildObj(target, ms, sent.getTime(), rcvd.getTime());
			//logs.create_user(obj);
		}
		callback();
	})
};

function buildObj(nome, ping, data_enviado, data_recebido) {
	var obj = new Object();
	obj.nome = nome;
	obj.ping = ping;
	obj.data_enviado = data_enviado;
	obj.data_recebido = data_recebido;
	return obj;
}