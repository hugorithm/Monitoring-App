var exports = module.exports = {}

exports.build_logs_object = function (nome, endereco, tipo_verificacao, data_enviado, data_recebido, latencia, codigo) {
    var object = new Object();
    object.nome = nome;
    object.endereco = endereco;
    object.tipo_verificacao = tipo_verificacao;
    object.data_enviado = data_enviado;
    object.data_recebido = data_recebido;
    object.latencia = latencia;
    object.codigo = codigo;
    return object;
}