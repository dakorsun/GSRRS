import wholeCupScript from "./wholeCupScript";
import {RACE_BATTLE} from "../../../util/constants/race";
import {initiateEvent} from "../../../src/services/redisService";
const defaultScript = () => {
    console.error('No "DB_SCRYPT_TYPE" env parameter is passed')
};
import serverConfig from "../../serverConfig";
const {BIKE_ONE, BIKE_TWO} = serverConfig;

export async function executeBattle(battle){
    const id = battle.get('id'),
         distance = 1000,
        BIKE_ONE_CYCLES = distance / BIKE_ONE.GEAR_DEVELOPMENT,
        BIKE_TWO_CYCLES = distance / BIKE_TWO.GEAR_DEVELOPMENT,
        config = {
            "type": RACE_BATTLE,
            "BIKE_ONE_RESULT": BIKE_ONE_CYCLES,
            "BIKE_TWO_RESULT": BIKE_TWO_CYCLES,
        };

    const result = await initiateEvent(id, config);
    console.log('initiate result: ', result);


}


const scriptToExecType = process.env.DB_SCRYPT_TYPE;

let script;
switch (scriptToExecType) {
    case 'WHOLE_CUP':
        script = wholeCupScript;
        break;
    default:
        script = defaultScript;
        break;
}

script();
