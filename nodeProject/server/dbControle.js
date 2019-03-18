var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/____');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function (callback) {
    console.log('Connection succeeded.');
});

var controlo = mongoose.Schema;

var controloSchema = new controlo({
    
    nome: {
        type: Boolean,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    propriedade1: {
        type: String,
        required: true
    },
    propriedade2: {
        type: String,
        required: true
    }, 
    tempo_verificacao : {
        type: String,
        required: true
    }
}, {
        versionKey: false
    });

var control = mongoose.model('nome', 'tipo', 'propriedade1', 
                                             'propriedade2', 'tempo_verificacao', controloSchema);

module.exports = control;