import {createCup} from "../../../src/services/tournamentService";
import {BATTLE_STAGES} from "../../../util/constants/battle";
const {ONE_EIGHT_FINAL} = BATTLE_STAGES;

const isTest = process.env.NODE_ENV === 'development';


const cupTestSeed = async (t) => {
    // try {
        return createCup({isActual: true}, {startStage: ONE_EIGHT_FINAL.sql, isSmallFinal: true});

    // } catch (err) {
    //     console.error(err);
    // }
};

const cupSeed = async () => {

}

export default isTest ? cupTestSeed : cupSeed;
