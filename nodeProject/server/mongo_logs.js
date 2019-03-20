var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost:27017/logs');

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function (callback) {
    console.log('Connection succeeded.');
});

var api = mongoose.Schema;

var jsonSchema = new api({
    json: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
}, {
        versionKey: false
    });

var Jsonsc = mongoose.model('json', jsonSchema);

module.exports = Jsonsc;