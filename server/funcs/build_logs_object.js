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

exports.build_error_object = function(nome,tipo, data_inicio, mensagem){
    var dados = new Object();
    dados.nome = nome;
    dados.tipo = tipo
    dados.data_inicio = data_inicio;
    dados.mensagem_alerta = mensagem;
    return dados;
}