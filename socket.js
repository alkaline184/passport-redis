var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Redis = require('ioredis');
var host = process.env.REDIS_URL || "127.0.0.1"
var redis = new Redis('redis://h:p28ef0ee6e0201776a709ee99d37b331dbd0bba904f2e30fcac10a4c1a2cf690c@ec2-34-195-166-91.compute-1.amazonaws.com:46399');
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