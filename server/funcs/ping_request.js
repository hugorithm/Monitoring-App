var ping = require("net-ping");
const dns = require("dns");

var exports = (module.exports = {});

const util = require('util');
const dnslookup = util.promisify(dns.lookup);

exports.send_ping_request = async function (nome, endereco, io, logs, callback) {

	var session = ping.createSession();

	session.on("error", function (error) {
		console.log(error.toString());
		session.close();
		session = ping.createSession();
	});

	var address = await dnslookup(endereco);

	await session.pingHost(address.address, async function (error, address, sent, rcvd) {
		var ms = rcvd - sent;
		if (error) {
			ms = -1;
			//decidir o que fazer quando der erro
		} else {
			var obj = buildObj(nome, endereco, sent.getTime(), rcvd.getTime(), ms);
			logs.create_user(obj);
		}
		callback();
	})
};

function buildObj(nome, endereco, data_enviado, data_recebido, ping) {
	var obj = new Object();
	obj.nome = nome;
	obj.endereco = endereco;
	obj.tipo = "Ping";
	obj.data_enviado = data_enviado;
	obj.data_recebido = data_recebido;
	obj.latencia = ping;
	return obj;
}