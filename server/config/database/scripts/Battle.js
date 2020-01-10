import '../../../src/models'
import {sequelize} from "../../../src/setup/sequelize";

const {Battle} = sequelize.models;

import moment from "moment-timezone";
import {RACE_BATTLE} from "../../../util/constants/race";
import {initiateEvent, setHash, userRunTick} from "../../../src/services/redisService";

import serverConfig from "../../serverConfig";
import {generateRunResultInMs} from "../../../util/common";
import {processBattleResult} from "../../../src/services/redisService";

const {BIKE_ONE, BIKE_TWO} = serverConfig;

export async function executeBattle(battleJSON) {
    // const battle = await Battle.findByPk(battleJSON.id);
    // const id = battle.get('id'),
    const time = moment();
    const START_TIMESTAMP = time.unix();

    const id = battleJSON.id,
        distance = 1000,
        BIKE_ONE_CYCLES = Math.floor(distance / BIKE_ONE.GEAR_DEVELOPMENT),
        BIKE_TWO_CYCLES = Math.floor(distance / BIKE_TWO.GEAR_DEVELOPMENT),
        racerOne = battleJSON.racers[0],
        racerTwo = battleJSON.racers[1],
        config = {
            TYPE: RACE_BATTLE,
            START_TIMESTAMP,
            BIKE_ONE_CYCLES,
            BIKE_TWO_CYCLES,
            [racerOne.id]:{
                HALL_PIN: BIKE_ONE.HALL_PIN,
                FINISH_TIMESTAMP: ''
            },
            [racerTwo.id]:{
                HALL_PIN: BIKE_TWO.HALL_PIN,
                FINISH_TIMESTAMP: ''
            },
        };

    const result = await initiateEvent(id, config);
    console.log('initiate result: ', result);

    let bikeOneFinishTime, bikeTwoFinishTime;
    bikeOneFinishTime = time.unix() + generateRunResultInMs(40000, 20000);
    bikeTwoFinishTime = time.unix() + generateRunResultInMs(40000, 20000);

    result[racerOne.id] = JSON.parse(result[racerOne.id]);
    result[racerTwo.id] = JSON.parse(result[racerTwo.id]);

    result[racerOne.id].FINISH_TIMESTAMP = bikeOneFinishTime;
    result[racerTwo.id].FINISH_TIMESTAMP = bikeTwoFinishTime;
    result[result[racerOne.id].HALL_PIN] = 0;
    result[result[racerTwo.id].HALL_PIN] = 0;

    result[racerOne.id] = JSON.stringify(result[racerOne.id]);
    result[racerTwo.id] = JSON.stringify(result[racerTwo.id]);

    await setHash(battleJSON.id, result);

    console.log('BIKE_ONE.HALL_PIN: ', BIKE_ONE.HALL_PIN);
    await processBattleResult(battleJSON.id);
}
