var Jsonsc = require('./mongo_logs.js');
var exports = module.exports = {}

// Criar user 
exports.create_user = function (new_json) {
    var teste = new Jsonsc({
        json: new_json
    });
    teste.save(function (err) {
        if (err) throw err;
        console.log('Ping salvo com sucesso!');
    });
}

//receber dados da bd
exports.getjson_teste = function (json) {
    Jsonsc.find({ "json.api_name": 'google' }, '-_id', function (err, users) {
        if (err) throw err;
        console.log(users);
    });
}

//apagar dados da bd
exports.delete_user = function (json) {
    Jsonsc.remove({ "json.ping": 0 }, function (err) {
        if (err) throw err;
        console.log('User successfully deleted!');
    });
}

//pings de uma api
exports.pingsapi = async function (tipo, nome, tempo) {
    return Jsonsc.find({
        "json.nome": nome,
        "json.tipo": tipo,
        "json.data_enviado": {$gte: new Date().getTime() - (tempo * 1000)}
    }, '-_id').sort({ "json.data_enviado": 'descending' }).exec();
}