var control = require('./mongo_controlo.js');
var exports = module.exports = {}

// Criar user 
exports.criar_api = function (dados) {
    var api = new control(dados);
    api.save(function (err) {
        if (err) throw err;
        console.log('Servico salvo com sucesso!');
    });
}

//mby fixed, just mby
/*
exports.listar_servicos = async function () {
    return control.find({}, '-_id'
    ).lean().exec();
}*/

exports.editar_dados_api = async function(nomeapi, novosdados){
    control.updateOne({nome:nomeapi},{$set:novosdados}, function(err){
        if(err) throw err;
    })
}

exports.listar_servicos = async function () {
    return control.find({}).lean().exec();
}

exports.listar_servicos_visiveis = async function(){
    return control.find({estado:"Visível"}).lean().exec();
}