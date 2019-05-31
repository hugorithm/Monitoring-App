var http_request = require("./funcs/http_Request");
var ping_request = require("./funcs/ping_Request");
var mongo_request = require("./funcs/mongodb_Request");
var mysql_request = require("./funcs/myslq_Request");
var build_logs = require("./funcs/build_logs_object");

var cronJob = require("cron").CronJob;

var exports = (module.exports = {});

var lista_crons = [];

exports.emitirDados = async function (tipo, controlo, logs) {
    var obj = [];
    await controlo.listar_servicos().then(async function (data) {
        for (var entry of data) {
            var servico = new Object;
            var nome = entry.nome;
            servico.key = nome;
            var dados = [];
            var tempo = 1 * 60
            await logs.pingsapi(tipo, nome, tempo).then(function (pings) {
                for (var i = 0; i < pings.length; i++) {
                    var entrada = new Object;
                    entrada.Data = pings[i].json.data_recebido;
                    entrada.Latencia = pings[i].json.latencia;
                    dados.push(entrada);
                }
                servico.values = dados;
                if (dados.length > 0) {
                    obj.push(servico);
                }
            })
        }
    })
    return obj;
}

async function stop_crons() {
    for (var i = 0; i < lista_crons.length; i++) {
        var cron = lista_crons[i];
        if (cron instanceof cronJob) {
            cron.stop();
        }
    }
    return "done";
}

exports.stop_cron = async function () {
    var crons = await stop_crons().then(
        lista_crons = []
    );
    console.log(lista_crons);
}

exports.start_cron = function (io, controlo, logs) {
    this.iniciar_verificacao_geral(io, controlo, logs);
}

exports.emitir_dados_ligaçao = async function (io, controlo, logs) {
    var tipos = ["Http", "Ping", "Mongo", "Mysql"];
    for (var entry of tipos) {
        var dados = await exports.emitirDados(entry, controlo, logs);
        io.emit("update_" + entry + "_data", dados);
    }
}

exports.adicionar_api = function (dados, io, controlo, logs) {
    if (dados.tipo !== "Http") {
        dados.cod_funcional = "0";
    }
    controlo.criar_api(dados);
    iniciar_verificacao_individual(dados, io, controlo, logs);
}

exports.iniciar_verificacao_geral = function (io, controlo, logs) {
    controlo.listar_servicos().then(function (data) {
        //inicializa um objeto com a lista
        var a = new Object(data);
        //itera sobre os elementos da lista
        for (var i = 0; i < a.length; i++) {
            var objeto = a[i];
            iniciar_verificacao_individual(objeto, io, controlo, logs);
        }
    });
}

function iniciar_verificacao_individual(objeto, io, controlo, logs) {
    for (var i = 0; i < objeto.tipo_verificacao.length; i++) {
        var tipo = objeto.tipo_verificacao[i];
        if (tipo == "Ping") {
            start_ping_check(objeto, io, controlo, logs);
        } else if (tipo == "Http") {
            start_http_check(objeto, io, controlo, logs);
        } else if (tipo == "Mongo") {
            start_mongodb_check(objeto, io, controlo, logs);
        } else if (tipo == "Mysql") {
            start_mysql_check(objeto, io, controlo, logs);
        } else {
            console.log("Nao foi possivel encontrar o tipo de verificaçao");
        }
    }
}

function start_ping_check(objeto, io, controlo, logs) {
    var cron = new cronJob(toCron(objeto.tempo_verificacao), function () {
        ping_request.send_ping_request(objeto, async function (nome, endereco, tipo_verificacao, sent, rcvd, ms, codigo) {
            var resposta = build_logs.build_logs_object(nome, endereco, tipo_verificacao, sent, rcvd, ms, codigo);
            logs.create_user(resposta);
            verifica_erros("Ping", io, controlo, logs);
            var dados = await exports.emitirDados("Ping", controlo, logs);
            io.emit("update_Ping_data", dados);
        });
    });
    lista_crons.push(cron);
    cron.start();
}

function start_http_check(objeto, io, controlo, logs) {
    var cron = new cronJob(toCron(objeto.tempo_verificacao), function () {
        http_request.send_http_request(objeto, async function (nome, endereco, tipo_verificacao, sent, rcvd, ms, codigo) {
            var resposta = build_logs.build_logs_object(nome, endereco, tipo_verificacao, sent, rcvd, ms, codigo);
            await logs.create_user(resposta);
            verifica_erros("Http", io, controlo, logs);
            var dados = await exports.emitirDados("Http", controlo, logs);
            io.emit("update_Http_data", dados);
        });
    });
    lista_crons.push(cron);
    cron.start();
}

function start_mongodb_check(objeto, io, controlo, logs) {
    var cron = new cronJob(toCron(objeto.tempo_verificacao), function () {
        mongo_request.send_mongodb_request(objeto, async function (nome, endereco, tipo_verificacao, sent, rcvd, ms, codigo) {
            var resposta = build_logs.build_logs_object(nome, endereco, tipo_verificacao, sent, rcvd, ms, codigo);
            logs.create_user(resposta);
            verifica_erros("Mongo", io, controlo, logs);
            var dados = await exports.emitirDados("Mongo", controlo, logs);
            io.emit("update_Mongodb_data", dados);
        });
    });
    lista_crons.push(cron);
    cron.start();
}

function start_mysql_check(objeto, io, controlo, logs) {
    var cron = new cronJob(toCron(objeto.tempo_verificacao), function () {
        mysql_request.send_mysql_request(objeto, async function (nome, endereco, tipo_verificacao, sent, rcvd, ms, codigo) {
            var resposta = build_logs.build_logs_object(nome, endereco, tipo_verificacao, sent, rcvd, ms, codigo);
            logs.create_user(resposta);
            verifica_erros("Mysql", io, controlo, logs);
            var dados = await exports.emitirDados("Mysql", controlo, logs);
            io.emit("update_Mysql_data", dados);
        });
    });
    lista_crons.push(cron);
    cron.start();
}

async function verifica_erros(tipo, io, controlo, logs) {
    var obj = [];
    await controlo.listar_servicos().then(async function (data) {
        for (var entry of data) {
            await logs.pingsapi(tipo, entry.nome, entry.duracao_erro).then(async function (data) {
                var contador = 0;
                var erros = 0;
                var data_primeiro_erro = ""
                for (var log of data) {
                    contador += 1;
                    if (entry.valor_maximo > log.json.latencia > entry.valor_minimo || (tipo == "Http" && entry.cod_funcional != log.json.codigo) || isNaN(log.json.codigo) == true) {
                        if (data_primeiro_erro == "") {
                            data_primeiro_erro = log.json.data_enviado
                        }
                        erros += 1
                    }
                }
                perc_erros = (erros / contador) * 100;
                if (perc_erros >= entry.percentagem_erro) {
                    var resposta = build_logs.build_error_object(entry.nome, tipo, data_primeiro_erro, entry.mensagem_alerta)
                    obj.push(resposta);
                }
            });
        }
        if(obj.length > 0){
            io.emit("update_Alerta_data", obj);
        }
        
    });
}

    function toCron(time) {
        var crontime = '*/' + time + ' * * * * *'
        return crontime;
    }