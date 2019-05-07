var MongoClient = require("mongodb").MongoClient

var exports = (module.exports = {});

exports.send_db_request = async function (nome, link, dbname, collection, query, callback) {
    var data_inicio = new Date().getTime();
     await MongoClient.connect(link, function (err, db) {
        if (err) throw err;
        var dbase = db.db(dbname);
        var dados = dbase.collection(collection).find(query)
        var data_fim = new Date().getTime();
        var latencia = data_fim - data_inicio;
        var obj = buildObj()
        callback(obj);
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