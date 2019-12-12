import gpio, {promise as gpiop} from 'rpi-gpio';

import serverConfig from '../../config/serverConfig'

const {RACER_ONE, RACER_TWO} = serverConfig;


gpio.on('change', function(channel, value) {
    console.log('Channel ' + channel + ' value is now ' + value);
});

gpiop.on('change')
    .then(function (channel, value) {
        console.log('Channel ' + channel + ' value is now ' + value);
    });

gpiop.setup(RACER_ONE.HALL_PIN, gpiop.DIR_IN, gpiop.EDGE_BOTH);

gpiop.setup(RACER_TWO.HALL_PIN, gpiop.DIR_IN, gpiop.EDGE_BOTH);

const GPIOService = {};


export default GPIOService;