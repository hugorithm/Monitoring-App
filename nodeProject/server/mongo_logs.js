var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/amsa');

var api = mongoose.Schema;

var jsonSchema = new api({
    json: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
}, {
        versionKey: false
    });

var Jsonsc = mongoose.model('requests', jsonSchema);

module.exports = Jsonsc;