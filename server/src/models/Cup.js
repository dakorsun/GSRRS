import Sequelize from 'sequelize';

import {BATTLE_STAGES} from "../../util/constants/battle";

const {QUALIFICATION, ONE_EIGHT_FINAL, QUARTER_FINAL, SEMI_FINAL, FINAL} = BATTLE_STAGES;

export default (sequelize, {CHAR, STRING, BOOLEAN}) => {
    const Cup = sequelize.define('Cup', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: CHAR(36).BINARY,
            defaultValue: Sequelize.UUIDV4,
        },
        isActual: {
            type: BOOLEAN,
            defaultValue: null,
            allowNull: true
        },
        treeMap: {
            type: STRING(16),
            allowNull: false,
            defaultValue: () => {
                let result = '', i = 0;
                while (i < 16) {
                    result = result + 0;
                    i++;
                }
                return result
            }
        },

    }, {
        tableName: 'cup',
    });



    Cup.prototype.toFullJSON = async function toFullJSON() {
        return {};
    };

    Cup.associate = function ({Cup, User, SingleRun, Battle, CupParticipant, CupConfig}) {
        Cup.belongsToMany(User, {through: CupParticipant});

        Cup.hasOne(CupConfig, {as: 'config', foreignKey: 'cupId'});
        Cup.hasMany(SingleRun, {foreignKey: 'cupId'});
        Cup.hasMany(Battle, {foreignKey: 'cupId'});
    };
    return Cup;
}
;
