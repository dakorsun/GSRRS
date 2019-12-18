import gpio from 'rpi-gpio';

import serverConfig from '../../config/serverConfig'

const {BIKE_ONE, BIKE_TWO} = serverConfig;

try{
gpio.on('connection', () => {
	console.log('gpio interface connected');
})

// gpio.on('change', function(channel, value) {
//     console.log('Channel ' + channel + ' value is now ' + value);
// });

gpio.on('error', (err)=> {
	console.error(err);
})

const buttons = require('rpi-gpio-buttons')([BIKE_ONE.HALL_PIN]);

buttons.on('pressed', function (pin) {
  console.log('User pressed button on pin ', pin);
});

buttons.on('clicked', function (pin) {
  console.log('User clicked button on pin ', pin);
});

buttons.on('button_click', function (pin) {
  console.log('User clicked button on pin ', pin);
});

buttons.on('button_release', function (pin) {
  console.log('User released button on pin ', pin);
});

buttons.on('clicked_pressed', function (pin) {
  console.log('User clicked then pressed button on pin ', pin);
});

buttons.on('button_changed', function (pin) {
	  console.log('Changed button on pin ', pin);
});

console.log('gpio setted up');

}catch(e){
	console.error(e);
}


const GPIOService = {
	gpio
};

export default GPIOService;
