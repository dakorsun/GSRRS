import gpio, {promise as gpiop} from 'rpi-gpio';

import serverConfig from '../../config/serverConfig'

const {BIKE_ONE, BIKE_TWO} = serverConfig;


gpio.on('change', function(channel, value) {
    console.log('Channel ' + channel + ' value is now ' + value);
});

gpiop.on('change')
    .then(function (channel, value) {
        console.log('Promise Channel ' + channel + ' value is now ' + value);
    });

gpiop.setup(BIKE_ONE.HALL_PIN, gpiop.DIR_IN, gpiop.EDGE_BOTH);

gpiop.setup(BIKE_TWO.HALL_PIN, gpiop.DIR_IN, gpiop.EDGE_BOTH);




export default {

};