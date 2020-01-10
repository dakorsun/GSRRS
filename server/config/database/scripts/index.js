import wholeCupScript from "./wholeCupScript";
import {RACE_BATTLE} from "../../../util/constants/race";
import {initiateEvent} from "../../../src/services/redisService";
const defaultScript = () => {
    console.error('No "DB_SCRYPT_TYPE" env parameter is passed')
};


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
