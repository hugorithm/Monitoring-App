var mysql = require('mysql');

var exports = (module.exports = {});

exports.send_mysql_request = async function (connection_data, query, callback) {
    var data_inicio = new Date().getTime();

    mysql.createConnection({
        host: connection_data.host,
        user: connection_data.username,
        password: connection_data.password,
        database: connection_data.database
    });

    await con.connect(function (err) {
        if (err) throw err;
        con.query(query, function (err, result) {
            if (err) throw err;
            var data_fim = new Date().getTime();
            var obj = buildObj()
            callback(obj);
        });
    });

}

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