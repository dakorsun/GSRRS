import socketIO from 'socket.io';

export default server => {
    const io = socketIO(server);
    io.on('connect', function (socket) {


    });
};