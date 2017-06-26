var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Redis = require('ioredis');
var redis = new Redis();
const port = process.env.PORT || 8080;

redis.subscribe('factories', function(err, count) {
});
redis.on('message', function(channel, message) {
    console.log('Message Received: ' + message + ". Channel: " + channel);
    io.emit(channel, message);
});
http.listen(port, function(){
    console.log('Listening on Port '+ port);
});