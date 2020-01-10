import _arrConcat from 'lodash/concat'
import _clone from 'lodash/clone'

import '../models';
import {sequelize, Sequelize} from '../setup/sequelize'
import {getUserById, getUserQualificationResult} from "./userService";

const Op = Sequelize.Op;

const {Cup, SingleRun, Battle} = sequelize.models;
import {BATTLE_STAGES, BATTLE_STAGES_ARR} from "../../util/constants/battle";
import {checkBattleUsers, getCupStageBattles, getCupStageBattlesJSON} from "./raceService";

const {QUALIFICATION, ONE_EIGHT_FINAL, QUARTER_FINAL, SEMI_FINAL, SMALL_FINAL, FINAL} = BATTLE_STAGES;

export function getCup(id) {
    return id ? Cup.findByPk(id) : Cup.findOne({where: {isActual: true}});
}

export async function createCup(values, config) {
    const {isActual} = values;
    const {startStage, isSmallFinal, ...rest} = config;

    try {
        //initial cup creating in db and adding a associated config;
        console.log('create cup');
        const cup = await Cup.create();
        if (isActual) {
            await cup.update({isActual});
        }
        console.log('create cup config');
        await cup.createConfig({...rest, startStage, isSmallFinal});

        const i = BATTLE_STAGES_ARR.findIndex(st => st === startStage);
        if (!(i + 1)) throw new Error(`Incorrect config stage value: ${startStage}`);
        let workingArr;
        if (!!isSmallFinal) {
            workingArr = BATTLE_STAGES_ARR.slice(i);
        } else {
            const smallFIndex = BATTLE_STAGES_ARR.findIndex(st => st === SMALL_FINAL.sql);
            let workingArrWithoutFinal = BATTLE_STAGES_ARR.slice(i, smallFIndex);
            workingArr = _arrConcat(workingArrWithoutFinal, [FINAL.sql])
        }

        // create required amount of battles for each stage
        console.log('create cup empty battles');
        await Promise.all(workingArr.map(async stage => {
            let battlesAmount;
            console.log('cup stage: ', stage);
            switch (stage) {
                case ONE_EIGHT_FINAL.sql:
                    battlesAmount = 8;
                    break;
                case QUARTER_FINAL.sql:
                    battlesAmount = 4;
                    break;
                case SEMI_FINAL.sql:
                    battlesAmount = 2;
                    break;
                case SMALL_FINAL.sql:
                    battlesAmount = 1;
                    break;
                case FINAL.sql:
                    battlesAmount = 1;
                    break;
                default:
                    break;
            }

            function createBattle(v, i, arr) {
                console.log(stage, 'stage iteration: ', i);
                console.log('arr.length: ', arr.length);
                return cup.createBattle({stage}, {transaction: t});
            };

            const execArr = [];
            while (battlesAmount > 0) {
                execArr.push(cup.createBattle({stage}));
                battlesAmount--;
            }
            // mockArr.length = battlesAmount;
            return Promise.all(execArr)
        }));
        return cup;
    } catch (e) {
        console.error(e);
        throw e
    }

}

export async function getQualificationRuns(cupId, isAll) {
    let cup, runs;
    try {
        cup = await getCup(cupId);
        runs = await cup.getSingleRuns();
        const usersSet = new Set();
        runs.map(run => {
            usersSet.add(run.get('userId'));
        });
        const fastestUniqueRuns = await Promise.all(Array.from(usersSet.values()).map(async id => {
            const fastestRun = await SingleRun.findOne({where: {userId: id}, order: [['result', 'ASC']]});
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
    const battlesJSON = await getCupStageBattlesJSON(cupId, ONE_EIGHT_FINAL.sql);
    const battles = await getCupStageBattles(cupId, ONE_EIGHT_FINAL.sql);
    console.log('qualifications length: ', topQualifications.length);
    const firstArr = [];
    const secondArr = [];
    let counter = 0;
    let flag = true;
    while (counter < topQualifications.length / 2) {
        const qualificationOne = topQualifications[counter];
        const runnerOne = await getUserById(qualificationOne.get('userId'));
        const qualificationTwo = topQualifications[topQualifications.length - (counter + 1)];
        const runnerTwo = await getUserById(qualificationTwo.get('userId'));

        let battle = battlesJSON.find(bat =>
            (bat.racers && bat.racers.length && bat.racers.findIndex(racer => {
                return (racer.id === runnerOne.get('id'))
            }) + 1)
            ||
            (bat.racers && bat.racers.length && bat.racers.findIndex(racer => racer.id === runnerTwo.get('id')) + 1)
        );
        battle = battle ? battle : await battlesJSON.find(bat => bat.racers && !bat.racers.length);
        battle = await Battle.findByPk(battle.id);

        const [isUserOne, isUserTwo] = await checkBattleUsers(battle.id, [runnerOne.get('id'), runnerTwo.get('id')]);

        if (!isUserOne) {
            await battle.addUser(runnerOne)
        }
        if (!isUserTwo) {
            await battle.addUser(runnerTwo)
        }

        const result = await battle.toFullJSON();

        result.racers.sort((a, b) => {
            const aResult = a.id === runnerOne.get('id') ? qualificationOne.get('result') : qualificationTwo.get('result');
            const bResult = b.id === runnerOne.get('id') ? qualificationOne.get('result') : qualificationTwo.get('result');
            const sorting_result = aResult < bResult ? -1 : 1;
            console.log();
            console.log(`sorting ${a.id}(${aResult/1000}) with ${b.id}(${bResult/1000}): `, sorting_result);
            console.log();
            return sorting_result;
        });

        flag ? firstArr.push(result) : secondArr.push(result);
        counter++;
        flag = !flag;
        battlesJSON.forEach((bat, i) => {
            if (bat.id === result.id) {
                battlesJSON[i].racers = undefined;
            }
        })
    }
    const result = _arrConcat(firstArr, secondArr);

    return result;
    // return result.map();
    // return Promise.all(result.map(async battle => {
    //     battle.racers = await Promise.all(battle.racers.map(async racer => {
    //         racer.bestResult = await getUserQualificationResult(racer.id, cupId);
    //     }))
    // }))
}


export async function getQuarterFinalComparedPairs(cupId, {succinctly}) {
    const cup = await getCup(cupId);
    const treeMap = cup.get('treeMap');


}


export async function registerCupParticipants(cupId, users) {
    const cup = await getCup(cupId);
    // await cup.addParticipants(users);
    await cup.addUsers(users);
}