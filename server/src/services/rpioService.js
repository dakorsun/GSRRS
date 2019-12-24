import rpio from 'rpio';

import serverConfig from '../../config/serverConfig'

import {Readable, Duplex, PassThrough} from 'stream';

const rd = new Readable();
const dp = new Duplex();
const pt = new PassThrough();

// rd.pipe(process.stdout);
// dp.pipe(process.stdout);
// pt.pipe(process.stdout);

const {BIKE_ONE, BIKE_TWO} = serverConfig;

if (process.env.GPIO_LIB === 'rpio') {

    try {
        // rpio.open(BIKE_ONE.HALL_PIN, rpio.INPUT, rpio.PULL_UP);
        rpio.open(BIKE_ONE.HALL_PIN, rpio.INPUT, rpio.PULL_DOWN);
        rpio.open(BIKE_TWO.HALL_PIN, rpio.INPUT, rpio.PULL_DOWN);

        // rpio.open(BIKE_ONE.HALL_PIN, rpio.INPUT);

        function pollcb(pin) {
            // console.log('rpio polling');

            /*
             * Wait for a small period of time to avoid rapid changes which
             * can't all be caught with the 1ms polling frequency.  If the
             * pin is no longer down after the wait then ignore it.
             */
            // rpio.msleep(20);

            if (rpio.read(pin))
                return;

            // console.log('Button pressed on pin P%d', pin);
            process.stdout.write(pin)
            // rd.emit('read', pin);
            // pt.write(pin);
        }

        // rpio.poll(BIKE_ONE.HALL_PIN, pollcb, rpio.POLL_LOW);
        rpio.poll(BIKE_ONE.HALL_PIN, pollcb);
        rpio.poll(BIKE_TWO.HALL_PIN, pollcb);
        console.log('rpio setted up')
    } catch (e) {
        console.error('rpio setup error: ', e);
    }
}


const rpioService = {
    gpio: rpio
};

export default rpioService;
