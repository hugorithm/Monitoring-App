var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/logs');

var controlo = mongoose.Schema;

var controloSchema = new controlo({
    
    nome: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    propriedade: {
        type: String,
        required: true
    }, 
    //tempo entre verificações e disponibilidade
    tempo_verificacao : {
        type: String,
        required: true
    }
}, {
        versionKey: false
    });

var control = mongoose.model('servicos', controloSchema);

module.exports = control;