var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/teste');
 
var db = mongoose.connection;
 
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function(callback) {
    console.log('Connection succeeded.');
    });
 
var Schema = mongoose.Schema;
 
var userSchema = new Schema({
     api_name: String,
     response_time: String,
 });

var User = mongoose.model('User', userSchema);

module.exports = User;