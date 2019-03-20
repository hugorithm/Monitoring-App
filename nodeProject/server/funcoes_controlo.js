var control = require('./mongo_controlo.js');
var exports = module.exports = {}

// Criar user 
exports.criar_servico = function (dados) {
    var servico = new control(dados);
    servico.save(function (err) {
        if (err) throw err;
        console.log('Ping salvo com sucesso!');
    });
}

//receber todos os servicos
//precisa de callback
// https://stackoverflow.com/questions/40897225/mongoose-js-findone-returning-query-metadata
// https://stackoverflow.com/questions/12030248/what-is-the-right-way-to-make-a-synchronous-mongodb-query-in-node-js
exports.listar_servicos = async function (json) {
    return control.find({}, '-_id').exec();
}

//apagar dados da bd
exports.delete_user = function (json) {
    Jsonsc.remove({ "json.ping": 0 }, function (err) {
        if (err) throw err;
        console.log('User successfully deleted!');
    });
}