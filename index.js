var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require ('socket.io')(http);
var users = [];

//local files
app.use("/assets", express.static(__dirname + '/assets'));

//index.html
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    //user connects
    console.log('a client connected');
    //user disconnects
    socket.on('disconnect', function(){
        // Find and remove item from an array
        var i = users.indexOf(socket.username);
        if(i != -1) {
            users.splice(i, 1);
        }
        console.log(users);
    });
    //user sends message
    socket.on('chat message', function(msg){
        var message = socket.username + ': ' + msg;
        console.log(message);
        //send broadcast to everyone+sender
        io.emit('chat message', message);
    });
    socket.on('username', function (username) {
        socket.username = username;
        users.push(socket.username);
        console.log(users);
    })
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});