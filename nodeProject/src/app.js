const express = require('express')
const app = express()

const teste = require('./teste')


//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))


//routes
app.get('/', (req, res) => {
	res.render('index')
})

//Listen on port 3000
server = app.listen(3000)

//socket.io instantiation
const io = require("socket.io")(server)

//ping
var ping = require("net-ping");

var session = ping.createSession();

var cronJob = require('cron').CronJob;
var target = "172.217.16.238";
console.log('start cron');
var Job = new cronJob('*/5 * * * * *', function(){
    console.log('cron started');
    session.pingHost (target, function (error, target, sent, rcvd) {
       var ms = rcvd - sent;
       msf = "" + ms;
        if (error)
        {
            msf = -1;
            io.emit('ping_time', {username: "ping", pingtime : msf});
        }
        else
        {
            io.emit('ping_time', {username: "ping", pingtime : msf});
            //introduz dados do ping no mongo xD
            var a = teste.create_user('Google', msf);
            teste.save_user(a);
        }
    });
    
    console.log('cron job completed');
}); 
Job.start();

//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')

	//default username
	socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})
