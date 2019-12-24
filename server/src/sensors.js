
import rpiGpioService from "./services/rpiGpioService.js";
import rpioService from "./services/rpioService.js";


let gpio;

const {GPIO_LIB} = process.env;

switch(GPIO_LIB){
    case 'rpio':
        gpio = rpioService.gpio;
        break;
    default:
        gpio = rpiGpioService.gpio
}