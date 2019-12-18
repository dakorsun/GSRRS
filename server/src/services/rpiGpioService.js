import gpio from 'rpi-gpio';

import serverConfig from '../../config/serverConfig'

const {BIKE_ONE, BIKE_TWO} = serverConfig;

if (process.env.GPIO_LIB === 'rpi-gpio') {
    try {
        gpio.on('connection', () => {
            console.log('gpio interface connected');
        })


        gpio.on('error', (err) => {
            console.error(err);
        })

        const buttons = require('rpi-gpio-buttons')([BIKE_ONE.HALL_PIN]);

        buttons.on('pressed', function (pin) {
            console.log('User pressed button on pin ', pin);
        });

        buttons.on('released', function (pin) {
            console.log('User released button on pin ', pin);
        });

        buttons.on('clicked', function (pin) {
            console.log('User clicked button on pin ', pin);
        });

        buttons.on('button_click', function (pin) {
            console.log('User button_clicked button on pin ', pin);
        });

        buttons.on('button_release', function (pin) {
            console.log('User button_release button on pin ', pin);
        });

        buttons.on('clicked_pressed', function (pin) {
            console.log('User clicked_pressed then pressed button on pin ', pin);
        });

        buttons.on('button_changed', function (pin) {
            console.log('Changed button on pin ', pin);
        });

        gpio.setup(BIKE_ONE.HALL_PIN, gpio.DIR_LOW, gpio.EDGE_BOTH);

        gpio.on('change', function (channel, value) {
            console.log('Channel ' + channel + ' value is now ' + value);
        });


        console.log('rpi-gpio setted up');

    } catch (e) {
        console.error('rpi-gpio setup error: ', e);
    }
}


const rpiGpioService = {
    gpio
};

export default rpiGpioService;
