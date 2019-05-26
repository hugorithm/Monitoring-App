var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/amsa');

var controlo = mongoose.Schema;

var controloSchema = new controlo({

    nome: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    classe: {
        type: String,
        required: true
    },
    propriedade: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    tipo_verificacao: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    tempo_verificacao: {
        type: String,
        required: true
    },
    valor_minimo: {
        type: String,
        required: true
    },
    valor_maximo: {
        type: String,
        required: true
    },
    duracao_erro: {
        type: String,
        required: true
    },
    percentagem_erro: {
        type: String
    },
    estado: {
        type: String,
        required: true
    },
    cod_funcional: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    cod_nao_funcional: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }

}, {
        versionKey: false
    });

var control = mongoose.model('servicos', controloSchema);

module.exports = control;