// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var engines = require('consolidate');
//
// var index = require('./routes/index');
// var users = require('./routes/users');
//
// var app = express();
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.engine('html', engines.mustache);
// app.set('view engine', '.html');
//
// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', index);
// app.use('/users', users);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// var io = require('socket.io').listen(8080);
// io.sockets.on('connection', function (socket) {
//     socket.emit('hay', 'hello from io!');
// }
// );

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function (socket) {
  // console.log(socket);
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
        // socket.emit('news', data);
    });
});

// io.sockets.on('connection', function (socket) {
//     socket.on('message', function (msg) {
//     var time = (new Date) .toLocaleTimeString();
//         socket.send("Hello "+msg+"!");
//         socket.broadcast.send(time+" К нам nрисоеденился "+msg);
//         console.log(msg+" connect! "+time);
// })
// });

// // Setup basic express server
// var express = require('express');
// var app = express();
// var server = require('http').createServer(app);
// var io = require('../..')(server);
// var port = process.env.PORT || 3000;
//
// server.listen(port, function () {
//     console.log('Server listening at port %d', port);
// });
//
// // Routing
// app.use(express.static(__dirname + '/public'));
//
// // Chatroom
//
// var numUsers = 0;
//
// io.on('connection', function (socket) {
//     var addedUser = false;
//
//     // when the client emits 'new message', this listens and executes
//     socket.on('new message', function (data) {
//         // we tell the client to execute 'new message'
//         socket.broadcast.emit('new message', {
//             username: socket.username,
//             message: data
//         });
//     });
//
//     // when the client emits 'add user', this listens and executes
//     socket.on('add user', function (username) {
//         if (addedUser) return;
//
//         // we store the username in the socket session for this client
//         socket.username = username;
//         ++numUsers;
//         addedUser = true;
//         socket.emit('login', {
//             numUsers: numUsers
//         });
//         // echo globally (all clients) that a person has connected
//         socket.broadcast.emit('user joined', {
//             username: socket.username,
//             numUsers: numUsers
//         });
//     });
//
//     // when the client emits 'typing', we broadcast it to others
//     socket.on('typing', function () {
//         socket.broadcast.emit('typing', {
//             username: socket.username
//         });
//     });
//
//     // when the client emits 'stop typing', we broadcast it to others
//     socket.on('stop typing', function () {
//         socket.broadcast.emit('stop typing', {
//             username: socket.username
//         });
//     });
//
//     // when the user disconnects.. perform this
//     socket.on('disconnect', function () {
//         if (addedUser) {
//             --numUsers;
//
//             // echo globally that this client has left
//             socket.broadcast.emit('user left', {
//                 username: socket.username,
//                 numUsers: numUsers
//             });
//         }
//     });
// });
//

module.exports = app;
