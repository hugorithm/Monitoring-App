var MongoClient = require("mongodb").MongoClient

var exports = (module.exports = {});

exports.send_mongodb_request = async function (objeto, callback) {
    var data_inicio = new Date().getTime();
     await MongoClient.connect(objeto.endereco, function (err, db) {
        if (err) throw err;
        var dbase = db.db(objeto.database);
        var dados_bd = dbase.collection(objeto.collection_name).find(objeto.query)
        var data_fim = new Date().getTime();
        var latencia = data_fim - data_inicio;
        var codigo = "ping_request";
        callback(objeto.nome, objeto.endereco, "Mongo", data_inicio, data_fim, latencia, codigo);
    });
}