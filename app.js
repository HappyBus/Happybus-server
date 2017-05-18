var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


var buses = [{busNumber: "11", cor: {x: 10, y: 10}}, {busNumber: "12", cor: {x: 20, y: 20}}, {
    busNumber: "13",
    cor: {x: 30, y: 30}
},
    {busNumber: "14", cor: {x: 40, y: 40}}, {busNumber: "15", cor: {x: 50, y: 50}}, {
        busNumber: "16",
        cor: {x: 60, y: 60}
    }];

/**
 * connect confirm withe users
 */
io.on('connection', function (socket) {

    socket.on("joinRoom", function (data, cb) {
        console.log(data);
        socket.join(data.busNumber);
        cb && cb("join number = " + data.busNumber);
    });


    socket.on("coreBus", function (data) {
        console.log(data);
        io.sockets.in(data.busNumber).emit("coreBusNumber", data);
    });

    /**
     *
     */
    socket.on('news', function (data, cb) {
        console.log(io.sockets);
        socket.broadcast.send('news', data);
        cb("ok");
        console.log(data);
        console.log(socket.handshake);
    });
});


module.exports = app;
