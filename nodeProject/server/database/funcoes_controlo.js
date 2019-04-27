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

//mby fixed, just mby
exports.listar_servicos = function () {
    return control.find({}, '-_id'
    ).lean().exec();
}