var control = require('./mongo_controlo.js');
var exports = module.exports = {}

// Criar user 
exports.criar_servico = function (dados) {
    var servico = new control(dados);
    servico.save(function (err) {
        if (err) throw err;
        console.log('Servico salvo com sucesso!');
    });
}

//receber todos os servicos
//precisa de callback
// https://stackoverflow.com/questions/40897225/mongoose-js-findone-returning-query-metadata
// https://stackoverflow.com/questions/12030248/what-is-the-right-way-to-make-a-synchronous-mongodb-query-in-node-js

//mby fixed, just mby
exports.listar_servicos = function (callback) {
    control.find({}, '-_id', function(err, data){
        callback(data);
    }).lean().exec();
}