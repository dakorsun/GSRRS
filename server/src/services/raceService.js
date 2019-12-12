import {sequelize} from '../setup/sequelize'
import EventEmitter from 'events'
import {RACE_RUN, RACE_BATTLE} from "../../util/constants/race";

import '../models';
import {sequelize, Sequelize} from '../setup/sequelize'

const OP = Sequelize.Op;
const{Cup, Run, Battle} = sequelize.models;
let raceInstance;

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
export async function getQualificationRuns(id, isAll) {
    let cup, runs;
    try {
        cup = await getCup(id);
        runs = await cup.getQualificationRuns();
        const usersSet = new Set();
        runs.map(run => {
            usersSet.add(run.get('userId'));
        });
        const fastestUniqueRuns = await Promise.all(Array.from(usersSet.values()).map(async id => {
            const [fastestRun, ...rest] = await Run.findAll({where: {userId: id}, order: [['result', 'ASC']]});
            return fastestRun;
        }));



export function getCup(id) {
    return id ? Cup.findByPk(id) : Cup.findOne({where: {isActual: true}});
}

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
        fastestUniqueRuns.sort((firstEl, secondEl) => {
            return firstEl.get('result') > secondEl.get('result') ? 1 : firstEl.get('result') === secondEl.get('result') ? 0 : -1
        });
        // fastestUniqueRuns.forEach(run => console.log(run.get('result')));

        return isAll ? fastestUniqueRuns : fastestUniqueRuns.splice(0, 16);
    } catch (e) {
        //todo boomify read error
        throw(e)
    }
}

export async function getOneEightComparedPairs(cupId) {
    const topQualifications = await getQualificationRuns(cupId);
    const result = [];
    let counter = 0;
    while (counter < topQualifications.length / 2) {
        const runnerOne = topQualifications[counter];
        const runnerTwo = topQualifications[topQualifications.length - (counter + 1)];
        const [battle, created] = await Battle.findOrCreate({where: {runnerOneId: runnerOne.get('id'), runnerTwoId: runnerTwo.get('id'), cupId}});
        result.push();
        counter++
    }
    return result;
}

export async function getTournamentGrid(cupId) {
    let cup = await getCup(cupId);
    const {treeMap} = cup.dataValues;

    const oneEightFinal = await getOneEightComparedPairs(cupId);

    let quarterFinal = [], semiFinal = [], final = [];
    const result = {
        oneEightFinal,
        quarterFinal,
        semiFinal,
        final
    };
    if (!(treeMap.indexOf(1) + 1)) {
        return result;
    } else {

    }


}

