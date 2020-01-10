import ntw from "number-to-words";
import logTree from "console-log-tree";

require('../../../src/models');

import seed from '../seeds'

import {
    getCup,
    getOneEightComparedPairs,
    getQualificationRuns, getQuarterFinalComparedPairs,
    registerCupParticipants
} from "../../../src/services/tournamentService";
import {getUserById} from "../../../src/services/userService";
import qualificationsSeed from "../seeds/qualificationsSeed";

import {sequelize} from '../../../src/setup/sequelize';
import {executeBattle} from "./Battle";

const {User, Cup} = sequelize.models;


async function performOneEightFinalRuns(cupId, oneEightPairs) {
    console.log('run One/Eight');
    const arr = await Promise.all(oneEightPairs.map(async battle => {

        await executeBattle(battle);

    }));
    // console.log('arr length: ', arr.length);
}

async function printBattlePairsTree(stageName, pairs, fastestRuns) {
    const printTree = pairs.map(((battle, i) => {
        let x;
        const [racerOne, racerTwo] = battle.racers;
        const userOneQualificationRunIndex = fastestRuns.findIndex(run => run.get('userId') === racerOne.id);
        const userOneQualificationRun = fastestRuns[userOneQualificationRunIndex];
        const userOneQualificationRunResult = userOneQualificationRun.get('result')
        const userTwoQualificationRunIndex = fastestRuns.findIndex(run => run.get('userId') === racerTwo.id);
        const userTwoQualificationRun = fastestRuns[userTwoQualificationRunIndex];
        const userTwoQualificationRunResult = userTwoQualificationRun.get('result');
        return {
            name: `battle-${ntw.toWordsOrdinal(i + 1)}`,
            children: [
                {name: `${userOneQualificationRunIndex + 1}) ${racerOne.firstName} - ${userOneQualificationRunResult / 1000} (${racerOne.id})`},
                {name: `${userTwoQualificationRunIndex + 1}) ${racerTwo.firstName} - ${userTwoQualificationRunResult / 1000} (${racerTwo.id})`}
            ]
        }
    }));

    console.log();
    console.log(stageName + ' pairs');
    console.log('first')
    logTree.log(printTree);
    console.log();
    // console.log('second')
    // logTree.log(printTree);
    // console.log();
    // console.log('third')
    // logTree.log(printTree);
    // console.log();
}

export default async function wholeCupScript() {
    // const [firstUser, secondUser] = userInstances;

    await seed();

    //get actual cup to work with
    const cup = await getCup();
    const cupId = cup.get('id');

    // get all existing users and register them in a cup;
    const users = await User.findAll();
    console.log('users length: ', users.length);

    await registerCupParticipants(cupId, users);

    const cupUsers = await cup.getUsers();

    //perform two qualification runs for each
    await qualificationsSeed(cupId, cupUsers);

    // ::)
    //Get top16 qualification runs
    const fastestRuns = await getQualificationRuns(cupId);
    console.log('fastestRuns length: ', fastestRuns.length);

    //Get compared One/Eight Pairs
    const config = {};
    const oneEightPairs = await getOneEightComparedPairs(cupId, config);

    // console log compared pairs
    await printBattlePairsTree('One/Eight', oneEightPairs, fastestRuns);

    //perform all One/Eight battles
    await performOneEightFinalRuns(cupId, oneEightPairs);

    const quarterFinalPairs = await getQuarterFinalComparedPairs(cupId, config)

    process.exit(0);
}

