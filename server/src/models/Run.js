import Sequelize from 'sequelize';

import {BATTLE_STAGES} from "../../util/constants/battle";
const {QUALIFICATION} = BATTLE_STAGES;


export default (sequelize,  {CHAR, INTEGER, }) => {
    const Run = sequelize.define('Run', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: CHAR(36).BINARY,
            defaultValue: Sequelize.UUIDV4,
        },
        [`${QUALIFICATION.camelCase}Id`]: CHAR(36).BINARY,
        result: INTEGER(15)
    }, {
        tableName: 'run',
    });


    Run.associate = function ({Run, Battle, User, Cup}) {
        Run.belongsTo(User, {foreignKey: 'userId'});
        Run.hasOne(Battle, {as: 'runnerOne', sourceKey: 'userId'});
        Run.hasOne(Battle, {as: 'runnerTwo', sourceKey: 'userId'});
        Run.belongsTo(Cup, {as: QUALIFICATION.camelCase, sourceKey: `${QUALIFICATION.camelCase}Id`, targetKey: 'id'});

    };
    return Run;
};
