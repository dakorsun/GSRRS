const Sequelize = require('sequelize');


models.exports = (sequelize, DataTypes) => {
    const CupRace = sequelize.define('Cup', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.CHAR(36).BINARY,
            defaultValue: Sequelize.UUIDV4,
        },
    }, {
        tableName: 'cup',
    });

    CupRace.prototype.toFullJSON = async function toFullJSON() {
        return {};
    };

    CupRace.associate = function ({Cup}) {

    };
    return Cup;
};
