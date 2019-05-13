var MongoClient = require("mongodb").MongoClient

var exports = (module.exports = {});

exports.send_mongodb_request = async function (connection_data, query, callback) {
    var data_inicio = new Date().getTime();
     await MongoClient.connect(connection_data.link, function (err, db) {
        if (err) throw err;
        var dbase = db.db(connection_data.dbname);
        var dados = dbase.collection(connection_data.collection).find(query)
        var data_fim = new Date().getTime();
        var latencia = data_fim - data_inicio;
        var obj = buildObj(connection_data.nome, connection_data.link, connection_data.dbname, data_inicio, data_fim, latencia)
        callback(obj, dados);
    });
}

function buildObj(nome, endereco, nome_dbase, data_enviado, data_recebido, ping) {
	var obj = new Object();
	obj.nome = nome;
    obj.endereco = endereco;
    obj.tipo = "Mongodb";
    obj.nome_dbase = nome_dbase;
	obj.data_enviado = data_enviado;
	obj.data_recebido = data_recebido;
	obj.latencia = ping;
	return obj;
}