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

/*
-ping
---nome
---endereco
---tipo_servico
---pedido
---
---data_enviado
---data_recebido
---ping
-http
---nome
---endereco
---tipo_servico
---pedido
---
---status_code
---data_enviado (mby)
---data_recebido (mby)
-database
---nome
---endereco
---tipo_servico
---pedido
---
---status_code
---
*/