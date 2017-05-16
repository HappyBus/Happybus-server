
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


/**
 * connect confirm withe users
 */
io.on('connection', function (socket) {

    /**
     * 
     */
    socket.on('news', function (data, cb) {
        socket.broadcast.send('news', data);
        cb("ok");
        console.log(data);

    });
});


module.exports = app;
