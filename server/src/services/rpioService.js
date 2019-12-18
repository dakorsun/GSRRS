import rpio from 'rpio';

import serverConfig from '../../config/serverConfig'

const {BIKE_ONE, BIKE_TWO} = serverConfig;


try {
    rpio.open(BIKE_ONE.HALL_PIN, rpio.INPUT, rpio.PULL_UP);

    function pollcb(pin) {
        console.log('rpio polling')

        /*
         * Wait for a small period of time to avoid rapid changes which
         * can't all be caught with the 1ms polling frequency.  If the
         * pin is no longer down after the wait then ignore it.
         */
        rpio.msleep(20);

        if (rpio.read(pin))
            return;

        console.log('Button pressed on pin P%d', pin);
    }

    rpio.poll(BIKE_ONE.HALL_PIN, pollcb, rpio.POLL_HIGH);
} catch (e) {
    console.error('rpio setup error: ', e);
}


const rpiGpioService = {
    rpio
};

export default rpiGpioService;
