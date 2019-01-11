const express = require('express');
const socket = require('socket.io');
// creacion App
var app = express();

var server = app.listen(4000, () => {
    console.log("ha iniciado el servidor")
})

// Archivos estaticos
app.use(express.static('public'));

// Configuracion socket.io
var io = socket(server);
io.on('connection', (socket) => {
    console.log(`socket connetion ${socket.id}`);
    //escuchar el mensaje enviado
    socket.on('chat', (data) => {
        //referencia a todos los sockets
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});

