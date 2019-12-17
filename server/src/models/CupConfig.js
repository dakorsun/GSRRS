import Sequelize from 'sequelize';

import {BATTLE_STAGES} from "../../util/constants/battle";

const {QUALIFICATION, ONE_EIGHT_FINAL, QUARTER_FINAL, SEMI_FINAL, FINAL} = BATTLE_STAGES;

export default (sequelize, {CHAR, STRING, BOOLEAN, INTEGER}) => {
    const CupConfig = sequelize.define('CupConfig', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: CHAR(36).BINARY,
            defaultValue: Sequelize.UUIDV4,
        },
        qualificationDistance: {
            type: INTEGER,
            defaultValue: 1000,
            allowNull: false
        },
        oneEightFinalDistance: {
            type: INTEGER,
            defaultValue: 1000,
            allowNull: false
        },
        quarterFinalDistance: {
            type: INTEGER,
            defaultValue: 1000,
            allowNull: false
        },
        semiFinalDistance: {
            type: INTEGER,
            defaultValue: 1000,
            allowNull: false
        },
        finalDistance: {
            type: INTEGER,
            defaultValue: 2000,
            allowNull: false
        },
    }, {
        tableName: 'cupConfig',
    });

    CupConfig.prototype.toFullJSON = async function toFullJSON() {
        return {
            qualificationDistance: get('qualificationDistance'),
            oneEightFinalDistance: get('oneEightFinalDistance'),
            quarterFinalDistance: get('quarterFinalDistance'),
            semiFinalDistance: get('semiFinalDistance'),
            finalDistance: get('finalDistance'),
        };
    };

    CupConfig.associate = function ({Cup, User, Run, Battle, CupParticipant}) {
        CupConfig.belongsTo(Cup, {as: 'config'})
    };
    return CupConfig;
}
;
