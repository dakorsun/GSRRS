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

    User.associate = function ({User, Run, Cup, CupParticipant}) {
        User.belongsToMany(Cup, {through: CupParticipant, as: 'participant'});
        User.hasMany(Run, {foreignKey: 'userId'});

    };
    return User;
};
