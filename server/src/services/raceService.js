import {sequelize} from '../setup/sequelize'
import {RACE_RUN, RACE_BATTLE} from "../../util/constants/race";
import {getCup} from "./tournamentService";

export async function  addUserQualificationRun(userData, cupId) {
    const {id, result} = userData;
    let cup, user;
    try {
        cup = await getCup(cupId);
        user = await User.findByPk(id)
    } catch (e) {
        //todo boomify read error
        throw(e)
    }
    let run;

    try {
        run = await user.createRun({result});
        await cup.addQualificationRun(run);
    } catch (e) {
        //todo boomify create error
        throw(e)
    }


}
