import {sequelize} from '../setup/sequelize'
import EventEmitter from 'events'
import {RACE_RUN, RACE_BATTLE} from "../../util/constants/race";

class RaceEmitter extends EventEmitter {
    constructor(config){
        super()

        const {id, type, racer, racers} = config;
        this.id = id;
        this.type = type;
        this.racer = racer;
        this.racers = racers;
    }
}

let raceInstance;

function initBattle(id, racers){
    raceInstance = new RaceEmitter({id, type: RACE_BATTLE, racers});
}

function initRun(id, racer){
    raceInstance = new RaceEmitter({id, type: RACE_BATTLE, racer});
}

function destroyRaceInstance() {
    raceInstance = undefined;
}

export default {
    raceInstance,
    initBattle,
    initRun,
    destroyRaceInstance
};