import gpio from 'rpi-gpio';
import serverConfig from '../../config/serverConfig'
const {RACER_ONE, RACER_TWO} = serverConfig;


gpio.on('change', function(channel, value) {
    console.log('Channel ' + channel + ' value is now ' + value);
});

gpio.setup(RACER_ONE.HALL_PIN, gpio.DIR_IN, gpio.EDGE_BOTH);

gpio.setup(RACER_TWO.HALL_PIN, gpio.DIR_IN, gpio.EDGE_BOTH);

const gpioService = {

};

export default gpioService;