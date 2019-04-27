var Jsonsc = require('./mongo_logs.js');
var exports = module.exports = {}

// Criar user 
exports.create_user = function (new_json) {
    var teste = new Jsonsc({
        json: new_json
    });
    teste.save(function (err) {
        if (err) throw err;
        console.log('Ping salvo com sucesso!');
    });
}

//receber dados da bd
exports.getjson_teste = function (json) {
    Jsonsc.find({ "json.api_name": 'google' }, '-_id', function (err, users) {
        if (err) throw err;
        console.log(users);
    });
}

//apagar dados da bd
exports.delete_user = function (json) {
    Jsonsc.remove({ "json.ping": 0 }, function (err) {
        if (err) throw err;
        console.log('User successfully deleted!');
    });
}

//pings de uma api
exports.pingsapi = function (nome) {
    return Jsonsc.find({"json.nome":nome}, '-_id').exec();
}

/*
JSONObject obj = new JSONObject(jstring);
obj.getJSONArray("fileName");

// atualizar/guardar/adicionar data
/*
    User.pre('save', function(next){
        var currentDate = new Date();
        this.updated_at = currentDate;
        if (!this.created_at)
            this.created_at = currentDate;

            next();
    });
    */

//para ir buscar um determinado mês
/*
    var monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    User.find({ApiName : 'Google'}).where('created_at').gt(monthAgo).exec(function(err, users) {

        if (err) throw err;

        console.log(users);
    });

//Update

    User.findById(1, function(err, user) {
    if (err) throw err;
      // change the users location
    user.location = 'uk';
      // save the user
    user.save(function(err) {
      if (err) throw err;
        console.log('Viva AO VITÓRIA! Atualizado com sucesso!');
    });
   });
*/

/*
encontrar e atualizar
(id = findbyidandupdate)
User.findOneAndUpdate({ username: 'starlord55' }, { username: 'starlord88' }, function(err, user) {
  if (err) throw err;
console.log(user);});
*/
/*
//Excluir

    User.find({ ApiName: 'Google' }, function(err, user) {
    if (err) throw err;

    // delete him
    user.remove(function(err) {
      if (err) throw err;

      console.log('User successfully deleted!');
    });
    });

    */

/* Encontrar e apagar
(id = findbyidandremove)
    User.findOneAndRemove({ username: 'starlord55' }, function(err) {
  if (err) throw err;

  // we have deleted the user
  console.log('User deleted!');
}); });
*/