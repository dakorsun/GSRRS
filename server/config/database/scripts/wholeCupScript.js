import ntw from "number-to-words";
import logTree from "console-log-tree";

require('../../../src/models');

import seed from '../seeds'

import {
    getCup,
    getOneEightComparedPairs,
    getQualificationRuns,
    registerCupParticipants
} from "../../../src/services/tournamentService";
import {getUserById} from "../../../src/services/userService";
import qualificationsSeed from "../seeds/qualificationsSeed";

import {sequelize} from '../../../src/setup/sequelize';
import {executeBattle} from "./index";

const {User, Cup} = sequelize.models;


async function performOneEightFinalRuns(cupId, oneEightPairs) {
    console.log('run One/Eight');
    const arr = await Promise.all(oneEightPairs.map(async battle => {

        await executeBattle(battle);

    }));
    // console.log('arr length: ', arr.length);
}

async function printBattlePairsTree(stageName, pairs, fastestRuns) {
    const printTree = await Promise.all(pairs.map((async (battle, i) => {
        const userOne = await getUserById(battle.get('runnerOneId'));
        const userTwo = await getUserById(battle.get('runnerTwoId'));
        const userOneQualificationRunIndex = fastestRuns.findIndex(run => run.get('userId') === userOne.get('id'));
        const userOneQualificationRun = fastestRuns[userOneQualificationRunIndex];
        const userTwoQualificationRunIndex = fastestRuns.findIndex(run => run.get('userId') === userTwo.get('id'));
        const userTwoQualificationRun = fastestRuns[userTwoQualificationRunIndex];
        return {
            name: `battle-${ntw.toWordsOrdinal(i + 1)}`,
            children: [
                {name: `${userOneQualificationRunIndex + 1}) ${userOne.get('firstName')} - ${userOneQualificationRun.get('result') / 1000}`},
                {name: `${userTwoQualificationRunIndex + 1}) ${userTwo.get('firstName')} - ${userTwoQualificationRun.get('result') / 1000}`}
            ]
        }

    })));

    console.log();
    console.log(stageName + ' pairs');
    logTree.log(printTree);
    console.log();
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

    const cupUsers = await cup.getCupParticipants();




    //perform two qualification runs for each
    await qualificationsSeed(cupId, cupUsers);

    // ::)
    //Get top16 qualification runs
    const fastestRuns = await getQualificationRuns(cupId);
    console.log('fastestRuns length: ', fastestRuns.length);

    //Get compared One/Eight Pairs
    const config = {};
    const oneEightPairs = await getOneEightComparedPairs(cupId, config);

    //console log compared pairs
    await printBattlePairsTree('One/Eight', oneEightPairs, fastestRuns);

    //perform all One/Eight battles
    await performOneEightFinalRuns(cupId, oneEightPairs);


    process.exit(0);
}

