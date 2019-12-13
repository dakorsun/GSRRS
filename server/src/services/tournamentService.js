import _arrConcat from 'lodash/concat'

import '../models';
import {sequelize, Sequelize} from '../setup/sequelize'
import {getUserById} from "./userService";
const OP = Sequelize.Op;
const {Cup, Run, Battle} = sequelize.models;

export function getCup(id) {
    return id ? Cup.findByPk(id) : Cup.findOne({where: {isActual: true}});
}

export async function getQualificationRuns(cupId, isAll) {
    let cup, runs;
    try {
        cup = await getCup(cupId);
        runs = await cup.getQualificationRuns();
        const usersSet = new Set();
        runs.map(run => {
            usersSet.add(run.get('userId'));
        });
        const fastestUniqueRuns = await Promise.all(Array.from(usersSet.values()).map(async id => {
            const fastestRun = await Run.findOne({where: {userId: id}, order: [['result', 'ASC']]});
            return fastestRun;
        }));
        fastestUniqueRuns.sort((firstEl, secondEl) => {
            return firstEl.get('result') > secondEl.get('result') ? 1 : firstEl.get('result') === secondEl.get('result') ? 0 : -1
        });
        // fastestUniqueRuns.forEach(run => console.log(run.get('result')));

        return (isAll ? fastestUniqueRuns : fastestUniqueRuns.splice(0, 16));
    } catch (e) {
        //todo boomify read error
        throw(e)
    }
}

export async function getOneEightComparedPairs(cupId, {succinctly}) {
    const topQualifications = await getQualificationRuns(cupId);
    console.log('qualifications length: ', topQualifications.length)
    const firstArr = [];
    const secondArr = [];
    let counter = 0;
    let flag = true;
    while (counter < topQualifications.length / 2) {
        const runOne = topQualifications[counter];
        const runnerOne = await getUserById(runOne.get('userId'));
        const runTwo = topQualifications[topQualifications.length - (counter + 1)];
        const runnerTwo = await getUserById(runTwo.get('userId'));
        const [battle, created] = await Battle.findOrCreate({
            where: {
                runnerOneId: runnerOne.get('id'),
                runnerTwoId: runnerTwo.get('id'),
                cupId
            }
        });
        flag ? firstArr.push(battle) : secondArr.push(battle);
        counter++;
        flag = !flag;
    }
    const result = _arrConcat(firstArr, secondArr);
    return result;
}

export async function processBattleResult(){

}

export async function getQuarterFinalComparedPairs(cupId, {succinctly}){
    const cup = await getCup(cupId);
    const treeMap = cup.get('treeMap');


}

export async function getOrInitiateQualificationRuns(cupId){

}

export async function registerCupParticipants(cupId, users){
    const cup = await getCup(cupId);
    await cup.addCupPartisipants(users);
}