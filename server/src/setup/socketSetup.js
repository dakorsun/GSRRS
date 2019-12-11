import socketIO from 'socket.io';
import {SOCKET_RUN_FINISHED, SOCKET_RUN_RESULT, SOCKET_START_RUN} from '../../../shared/constants/socketActions'

const isTest = process.envNODE_ENV === 'development';

function startRun(io, socket, id) {
    console.log('start run socket');
    let result = 0;
    const interval = setInterval(function () {
        result = result + 4;
        if (!(result % 100)) {
            console.log('tick: ', result);
        }
        if (result >= 1000) {
            clearInterval(interval);
            io.emit(SOCKET_RUN_FINISHED, {id, result});
        } else {
            io.emit(SOCKET_RUN_RESULT, {id, result});
        }
    }, 20);
}

function testSocketSetup(server){
    const io = socketIO(server);
    io.on('connect', function (socket) {
        console.log('socket: a client connected: ', socket.id);
        let id;
        socket.on('init', racerId => {
            console.log('init id: ', racerId);
            id = racerId;
        });
        socket.on(SOCKET_START_RUN, function () {
            startRun(io, socket, id);
        })

    });
}

function socketSetup(server){
    const io = socketIO(server);
    io.on('connect', function (socket) {

    })
}


export default isTest ? testSocketSetup : socketSetup;