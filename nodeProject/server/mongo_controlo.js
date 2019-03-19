var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/controlo');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function (callback) {
    console.log('Connection succeeded.');
});

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

var control = mongoose.model('nome', 'tipo', 'class', 'propriedade', 'tempo_verificacao', controloSchema);

module.exports = control;