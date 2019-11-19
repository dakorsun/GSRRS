import socketIO from 'socket.io';
import {SOCKET_RACE_STEP} from '../../../shared/constants/socketActions'

console.log(SOCKET_RACE_STEP);

export default  server => {
    const io = socketIO(server);
    io.on('connection', function (socket) {
        console.log('socket: a client connected');

        socket.emit(SOCKET_RACE_STEP);
    });
};