import Sequelize, {BOOLEAN} from 'sequelize';


import {BATTLE_STAGES, BATTLE_STAGES_ARR} from "../../util/constants/battle";

const {QUALIFICATION, ONE_EIGHT_FINAL, QUARTER_FINAL, SEMI_FINAL, FINAL} = BATTLE_STAGES;

export default (sequelize, {CHAR, STRING, BOOLEAN, INTEGER}) => {
    const Battle = sequelize.define('Battle', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: CHAR(36).BINARY,
            defaultValue: Sequelize.UUIDV4,
        },
        stage: {
            defaultValue: null,
            type: STRING,
            validate: {
                isIn: [[...BATTLE_STAGES_ARR]]
            }
        },
        isActual: {
            defaultValue: null,
            type: BOOLEAN
        }
    }, {
        tableName: 'battle',
    });

    Battle.prototype.proceedWinner = async function proceedWinner() {
        const [winner, looser] = await this.getUsers({order: [["result", "ASC"]]});
        const fullJSON = await this.toFullJSON();
        console.log(winner.get('id'), looser.get('id'));
        console.log(fullJSON);
    };

    Battle.prototype.toFullJSON = async function toFullJSON() {
        const cupId = this.get('cupId');
        // get racers
        const racers = await this.getUsers().then(async racers => {
            return !!racers[0] ? !!racers[1] ?
                await Promise.all(racers.map(racer => (racer.toRaceJSON())))
                : await racers[1].toRaceJSON()
                : racers
        });
        // sort racers by qualification results;
        return {
            id: this.get('id'),
            stage: this.get('stage'),
            cupId,
            racers
        };
    };

    Battle.associate = function ({Battle, User, BattleRun, Cup}) {

        Battle.belongsToMany(User, {through: BattleRun});
        Battle.belongsTo(Cup, {foreignKey: 'cupId'});
    };
    return Battle;
};
