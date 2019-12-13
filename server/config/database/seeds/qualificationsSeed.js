import logTree from 'console-log-tree'
import ntw from 'number-to-words'

require('../../../src/models');
import {sequelize} from '../../../src/setup/sequelize';
import {getUserById} from "../../../src/services/userService";
import {addUserQualificationRun} from '../../../src/services/raceService'
import {generateRunResultInMs} from "../../../util/common";

const {Cup} = sequelize.models;
const maxRunResult = 40000;
const minRunResult = 20000;

async function createSingleUserQualificationRecord(user, cupId) {
    const id = user.get('id');
    const result = generateRunResultInMs(maxRunResult, minRunResult);   
    await addUserQualificationRun({id, result}, cupId);
}


async function qualificationsSeed(cupId, userInstances) {
    //perform mock qualificationRuns
    await Promise.all(userInstances.map(async user => {
        await createSingleUserQualificationRecord(user, cupId);
        await createSingleUserQualificationRecord(user, cupId);
    }));
}

export default qualificationsSeed