import Sequelize from 'sequelize';

import serverConfig from "../../config/serverConfig";
import {BATTLE_STAGES} from "../../util/constants/battle";
import {BIKE_ONE, BIKE_TWO} from "../../util/constants/bike";
const {QUALIFICATION} = BATTLE_STAGES;



export default (sequelize,  {CHAR, STRING, INTEGER}) => {
    const SingleRun = sequelize.define('SingleRun', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: CHAR(36).BINARY,
            defaultValue: Sequelize.UUIDV4,
        },
        bike: {
            type: STRING,
            defaultValue: serverConfig.DEFAULT_BIKE,
            validate: {
                isIn: [[BIKE_ONE, BIKE_TWO]]
            }
        },
        [`${QUALIFICATION.camelCase}Id`]: CHAR(36).BINARY,
        result: INTEGER(15)
    }, {
        tableName: 'singleRun',
    });


    SingleRun.associate = function ({SingleRun, Battle, User, Cup}) {
        SingleRun.belongsTo(User, {foreignKey: 'userId'});
        SingleRun.belongsTo(Cup, {foreignKey: 'cupId'});

    };
    return SingleRun;
};
