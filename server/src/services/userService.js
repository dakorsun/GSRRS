import '../models';
import {sequelize} from '../setup/sequelize'
const {User} = sequelize.models;

import {getCup} from "./tournamentService";

export async function getUserById(id){
    return User.findByPk(id);
}
