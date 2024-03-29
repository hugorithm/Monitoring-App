var express = require('express');
app = express();
port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var Task = require('./api/models/todoListModel'); //created model loading here
var bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Tododb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route

app.use(function (req, res) {
  res.status(200).send({ url: req.originalUrl, status: 'ok' })
});

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);