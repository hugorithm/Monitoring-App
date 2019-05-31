var ping = require("net-ping");
const dns = require("dns");

var exports = (module.exports = {});

const util = require('util');
const dnslookup = util.promisify(dns.lookup);

exports.send_ping_request = async function (objeto, callback) {
	var di = new Date().getTime();
	var session = ping.createSession();

	session.on("error", function (error) {
		console.log(error.toString());
	});

	await dnslookup(objeto.endereco, async (err, address) => {
		if (err) {
			callback(objeto.nome, objeto.endereco, "Ping", di, di, 0, err.code);
		}
		else {
			await session.pingHost(address, async function (error, address, sent, rcvd) {

				var codigo = 0;
				var ms = rcvd - sent;
				if (error) {
					ms = 0;
					codigo = 1;
				}
				callback(objeto.nome, objeto.endereco, "Ping", sent.getTime(), rcvd.getTime(), ms, codigo);
			})
		}
	});
}