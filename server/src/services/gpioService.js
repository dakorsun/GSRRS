import gpio, {promise as gpiop} from 'rpi-gpio';
//import rpi-buttons from 'rpi-gpio-buttons';

import serverConfig from '../../config/serverConfig'

const {RACER_ONE, RACER_TWO} = serverConfig;
try{
gpio.on('connection', () => {
	console.log('gpio interface connected');
})

gpio.on('change', function(channel, value) {
    console.log('Channel ' + channel + ' value is now ' + value);
});

gpio.on('error', (err)=> {
	console.error(err);
})

const used = [1,2,4,6,9,14,17,20,25,30,39];
//try{

//for(let i = 1; i++; i <= 40){
//	if(!(used.findIndex(x => x === i) + 1)){
//		gpio.setup(i, gpio.DIR_IN, gpio.EDGE_BOTH);
//	}
//}
//}catch(e){
//	console.error(e);
//}
	
const buttons = require('rpi-gpio-buttons')([RACER_ONE.HALL_PIN]); 

buttons.on('pressed', function (pin) {
  console.log('User pressed button on pin ', pin);
});

buttons.on('clicked', function (pin) {
  console.log('User clicked button on pin ', pin);
});

buttons.on('clicked_pressed', function (pin) {
  console.log('User clicked then pressed button on pin ', pin);
});

buttons.on('button_changed', function (pin) {
	  console.log('Changed button on pin ', pin);
});

	//gpio.setup(RACER_ONE.HALL_PIN, gpio.DIR_IN, gpio.EDGE_BOTH);

	//setInterval(() => {
	//	gpio.read(RACER_ONE.HALL_PIN, (state, ...args) => {
	//		console.log(RACER_ONE.HALL_PIN + ' pin state: ', state, ...args)
	//	})  
	//}, 2000)

//gpio.setup(RACER_ONE.HALL_PIN, gpio.DIR_IN, gpio.EDGE_NONE);

//gpiop.on('change')
  //  .then(function (channel, value) {
    //    console.log('Channel ' + channel + ' value is now ' + value);
    //});

//gpiop.setup(RACER_ONE.HALL_PIN, gpiop.DIR_IN, gpiop.EDGE_BOTH);



//gpiop.setup(RACER_TWO.HALL_PIN, gpiop.DIR_IN, gpiop.EDGE_BOTH);

console.log('gpio setted up');
}catch(e){
	console.error(e);
}


const GPIOService = {
	gpio
};

export default GPIOService;
