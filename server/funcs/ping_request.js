var ping = require("net-ping");
const dns = require("dns");

var exports = (module.exports = {});

const util = require('util');
const dnslookup = util.promisify(dns.lookup);

exports.send_ping_request = async function (objeto, callback) {

	var session = ping.createSession();

	session.on("error", function (error) {
		console.log(error.toString());
		session.close();
		session = ping.createSession();
	});

	var address = await dnslookup(objeto.endereco);

	await session.pingHost(address.address, async function (error, address, sent, rcvd) {
		var ms = rcvd - sent;
		if (error) {
			ms = -1;
			//decidir o que fazer quando der erro
		}
		var codigo = "ping_request"
		callback(objeto.nome, objeto.endereco, "Ping", sent.getTime(), rcvd.getTime(), ms, codigo);
	})
};