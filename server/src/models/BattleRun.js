import Sequelize from 'sequelize';

import {BATTLE_STAGES} from "../../util/constants/battle";
import {BIKE_ONE, BIKE_TWO} from "../../util/constants/bike";
const {QUALIFICATION} = BATTLE_STAGES;


export default (sequelize,  {CHAR, STRING, INTEGER}) => {
    const BattleRun = sequelize.define('BattleRun', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: CHAR(36).BINARY,
            defaultValue: Sequelize.UUIDV4,
        },
        bike: {
            type: STRING,
            allowNull: true,
            defaultValue: null,
            validate: {
                isIn: [[BIKE_ONE, BIKE_TWO]]
            }
        },
        result: INTEGER(15)
    }, {
        tableName: 'battleRun',
    });


    BattleRun.associate = function ({BattleRun}) {

    };
    return BattleRun;
};
