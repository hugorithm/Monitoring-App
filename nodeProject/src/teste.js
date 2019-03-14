var Jsonsc = require('./db.js');
var exports = module.exports = {}

// Criar user 
exports.create_user = function (new_json){
  var teste = new Jsonsc ({
    json : new_json
  });
  return teste;
}

//guardar user na DB

exports.save_user = function (user){
  user.save(function(err){
    if (err) throw err;
    console.log('Guardado com sucesso!');
  });
}
//receber dados da bd
exports.getjson_teste = function(json){
  Jsonsc.find({}, function(err, users){
    if (err) throw err;
    console.log(users);
   /*var a = new Array();
    for(var i = 0 ; i < users.length; i++){
      
      var linha = JSON.parse('[i]');
      delete linha['_id'];
      a.push(linha);
    }
    return a;*/
  }); 
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