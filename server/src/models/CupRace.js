import Sequelize from 'sequelize';


export default (sequelize, DataTypes) => {
    const CupRace = sequelize.define('CupRace', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.CHAR(36).BINARY,
            defaultValue: Sequelize.UUIDV4,
        },
    }, {
        tableName: 'cupRace',
    });

    CupRace.prototype.toFullJSON = async function toFullJSON() {
        return {};
    };

    CupRace.associate = function ({UserRace}) {

    };
    return CupRace;
};
