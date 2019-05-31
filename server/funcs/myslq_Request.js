var mysql = require('mysql');

var exports = (module.exports = {});

exports.send_mysql_request = async function (objeto, callback) {
    var data_inicio = new Date().getTime();
    console.log("data_inicio " + data_inicio);

    var con = mysql.createConnection({
        host: objeto.endereco,
        user: objeto.username,
        password: objeto.password,
        database: objeto.database
    });

    await con.connect(function (err) {
        if (err) throw err;
        con.query(objeto.query, function (err, result) {
            if (err) throw err;
            var data_fim = new Date().getTime();
            console.log("data_fim " + data_fim);
            var latencia = data_fim - data_inicio;
            console.log(latencia)
            var codigo = "mysql_request";
            callback(objeto.nome, objeto.endereco, "Mysql", data_inicio, data_fim, latencia, codigo);
        });
    });
}