import Sequelize from 'sequelize';

import {BATTLE_STAGES} from "../../util/constants/battle";
import {BIKE_ONE, BIKE_TWO} from "../../util/constants/bike";
const {QUALIFICATION} = BATTLE_STAGES;


export default (sequelize,  {CHAR, STRING, INTEGER}) => {
    const Run = sequelize.define('Run', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: CHAR(36).BINARY,
            defaultValue: Sequelize.UUIDV4,
        },
        bike: {
            type: STRING,
            validate: {
                isIn: [[BIKE_ONE, BIKE_TWO]]
            }
        },
        [`${QUALIFICATION.camelCase}Id`]: CHAR(36).BINARY,
        result: INTEGER(15)
    }, {
        tableName: 'run',
    });


    Run.associate = function ({Run, Battle, User, Cup}) {
        Run.belongsTo(User, {foreignKey: 'userId'});
        Run.belongsTo(Battle, {as: 'runOne'});
        Run.belongsTo(Battle, {as: 'runTwo'});
        Run.belongsTo(Cup, {as: QUALIFICATION.camelCase, sourceKey: `${QUALIFICATION.camelCase}Id`, targetKey: 'id'});

    };
    return Run;
};
