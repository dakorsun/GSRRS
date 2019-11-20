import Sequelize from 'sequelize';


export default (sequelize, DataTypes) => {
    const UserRace = sequelize.define('UserRace', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.CHAR(36).BINARY,
            defaultValue: Sequelize.UUIDV4,
        },
    }, {
        tableName: 'userRace',
    });

    UserRace.prototype.toFullJSON = async function toFullJSON() {
        return {};
    };

    UserRace.associate = function ({UserRace}) {

    };
    return UserRace;
};
