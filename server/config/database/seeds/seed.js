import {USER_ROLES} from "../../../util/constants/user";

const {ROLE_RACER} = USER_ROLES;
require('../../../src/models');
import {sequelize} from '../../../src/setup/sequelize';
import {getQualificationRuns, getTournamentGrid} from "../../../src/services/raceService";
import {addUserQualificationRun} from "../../../src/services/userService";
import {generateRunResultInMs} from "../../../util/common";
const isTest = process.env.NODE_ENV === 'development';

const {Cup} = sequelize.models;
const maxRunResult = 40000;
const minRunResult = 20000;


async function createSingleUserQualificationRecord(user) {
    const id = user.get('id');
    const result = generateRunResultInMs(maxRunResult, minRunResult);
    await addUserQualificationRun({id, result});
}


async function testSeed(userInstances) {
    const [firstUser, secondUser] = userInstances;

    //creat cup to work with
    await sequelize.transaction(async t => {
        await Cup.create({isActual: true}, {transaction: t});
    })

    //perform mock qualificationRuns
    await sequelize.transaction(async t => {
        await Promise.all(userInstances.map(async user => {
            await createSingleUserQualificationRecord(user);
            await createSingleUserQualificationRecord(user);
        }));
    })

    // ::)
    const fastestRuns = await getQualificationRuns();

    const grid = await getTournamentGrid();

    let x;

}

async function seed(){

}

export default isTest ? testSeed : seed