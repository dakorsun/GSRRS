import '../models';
import {sequelize} from '../setup/sequelize'
const {User} = sequelize.models;

import {getCup} from "./raceService";

export async function addUserQualificationRun(userData) {
    const {id, result} = userData;
    let cup, user;
    try {
        cup = await getCup();
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
