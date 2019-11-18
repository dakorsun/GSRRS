const socketIO = require('socket.io');

const socketSetup = server => {
    const io = socketIO(server);
    io.on('connection', function (socket) {
        console.log('a racer connected');
    });
};

module.exports = socketSetup;