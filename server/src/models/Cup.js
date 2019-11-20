import Sequelize from 'sequelize';


export default (sequelize, DataTypes) => {
    const Cup = sequelize.define('Cup', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.CHAR(36).BINARY,
            defaultValue: Sequelize.UUIDV4,
        },
    }, {
        tableName: 'cup',
    });

    Cup.prototype.toFullJSON = async function toFullJSON() {
        return {};
    };

    Cup.associate = function ({Cup}) {

    };
    return Cup;
};
