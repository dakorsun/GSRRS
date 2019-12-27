import Sequelize from 'sequelize';

import {USER_ROLES} from '../../util/constants/user';
const {ROLE_RACER, ROLE_ADMIN} = USER_ROLES;

export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.CHAR(36).BINARY,
            defaultValue: Sequelize.UUIDV4,
        },
        email: {
            type: DataTypes.STRING, allowNull: false, unique: true,
            validate: {
                notNull: {msg: 'The email is required'},
                isEmail: {msg: 'Must be a valid email'},
            },
        },
        firstName: {type: DataTypes.STRING, allowNull: true},
        lastName: {type: DataTypes.STRING, allowNull: true},
        nickname: DataTypes.STRING,
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
            set(val) {
                this.setDataValue('gender', val.toLowerCase())
            }
        },
        settings: {type: DataTypes.JSON, allowNull: true, defaultValue: {}},
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ROLE_RACER,
            validate: {
                notNull: {msg: 'The role is required'},
                isIn: [Object.keys(USER_ROLES)],
            },
        },
    }, {
        tableName: 'user',
    });

    User.prototype.toFullJSON = async function toFullJSON() {
        return {};
    };

    User.prototype.toRaceJSON = async function toRaceJSON(){
        return {
            id: this.get('id'),
            firstName: this.get('firstName'),
            lastName: this.get('lastName'),
            nickname: this.get('nickname')
        }
    };

    User.associate = function ({User, SingleRun, Cup, CupParticipant, Battle, BattleRun}) {
        User.belongsToMany(Cup, {through: CupParticipant});
        User.belongsToMany(Battle, {through: BattleRun});
        // User.belongsToMany(Cup, {as: 'participants', through: CupParticipant});
        // User.belongsToMany(Cup, {as: {singular: 'participant', plular: 'participants'}, through: CupParticipant});
        User.hasMany(SingleRun, {foreignKey: 'userId', as: 'singleRuns'});

    };
    return User;
};
