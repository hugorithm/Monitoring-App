var control= require('./mongo_controlo.js');
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
exports.listar_servicos = function (json) {
    var users = control.find({}, '-_id', function (err, users) {
        if (err) throw err;
        return users;
    });
    return users;
}

//apagar dados da bd
exports.delete_user = function (json) {
    Jsonsc.remove({ "json.ping": 0 }, function (err) {
        if (err) throw err;
        console.log('User successfully deleted!');
    });
}