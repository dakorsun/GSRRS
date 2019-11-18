const socketIO = require('socket.io');

const socketSetup = server => {
    const io = socketIO(server);
    io.on('connection', function (socket) {
        console.log('socket: a client connected');

        socket.emit('SOCKET_RACE_STEP');
    });
};

module.exports = socketSetup;