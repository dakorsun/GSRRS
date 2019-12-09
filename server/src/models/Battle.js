import Sequelize from 'sequelize';


import {BATTLE_STAGES} from "../../util/constants/battle";
const {QUALIFICATION, ONE_EIGHT_FINAL, QUARTER_FINAL, SEMI_FINAL, FINAL} = BATTLE_STAGES;

export default (sequelize, {CHAR, STRING}) => {
    const Battle = sequelize.define('Battle', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: CHAR(36).BINARY,
            defaultValue: Sequelize.UUIDV4,
        },
    }, {
        tableName: 'battle',
    });

    Battle.prototype.toFullJSON = async function toFullJSON() {
        return {};  
    };

    Battle.associate = function ({Battle, User, Run, Cup}) {
        Battle.belongsTo(Run, {as: 'runnerOne', targetKey: 'userId'});
        Battle.belongsTo(Run, {as: 'runnerTwo', targetKey: 'userId'});

        Battle.belongsTo(Cup, {foreignKey: 'cupId'});
    };
    return Battle;
};
