import {sequelize} from '../setup/sequelize'
import '../models'
import {RACE_RUN, RACE_BATTLE} from "../../util/constants/race";
import {getCup} from "./tournamentService";
import {getUserById} from "./userService";

const {User, Cup, Battle} = sequelize.models;

export async function  addUserQualificationRun({id, result}, cupId) {
    let cup, user;
    try {
        cup = await getCup(cupId);
        user = await getUserById(id)
    } catch (e) {
        //todo boomify read error
        throw(e)
    }
    let run;

    try {
        run = await user.createSingleRun({result});
        await cup.addSingleRun(run);
    } catch (e) {
        //todo boomify create error
        throw(e)
    }
}

export function getCupStageBattlesJSON(cupId, stage){
    return getCupStageBattles(cupId, stage).then(battles => (Promise.all(battles.map(battle => (battle.toFullJSON())))));
}

export async function getCupStageBattles(cupId, stage){
    const cup = await getCup(cupId);
    return cup.getBattles({where: {stage}});
}

//check whether the container includes both puppies
export async function checkBattleUsers(battleId, [userOneId, userTwoId]){
    const battle = await Battle.findByPk(battleId);
    const isUserOne = await battle.hasUser(userOneId);
    const isUserTwo = await battle.hasUser(userTwoId);
    return [isUserOne, isUserTwo]
}
