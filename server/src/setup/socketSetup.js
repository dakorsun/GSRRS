import socketIO from 'socket.io';
import {SOCKET_RUN_FINISHED, SOCKET_RUN_RESULT, SOCKET_START_RUN} from '../../../shared/constants/socketActions'

export default server => {
    const io = socketIO(server);
    io.on('connect', function (socket) {


    });
};