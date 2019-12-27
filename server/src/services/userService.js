import '../models';
import {sequelize} from '../setup/sequelize'

const {User, SingleRun} = sequelize.models;

import {getCup} from "./tournamentService";

export async function getUserById(id) {
    return User.findByPk(id);
}

export async function getUserQualificationResult(userId, cupId) {
    const cup = getCup(cupId);
    const [result] = await SingleRun.findAll({where: {userId, cupId}, order: [['result', 'ASC']]});
    return result;
}