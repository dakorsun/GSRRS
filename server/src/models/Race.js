import Sequelize from 'sequelize';


export default (sequelize, DataTypes) => {
    const Race = sequelize.define('Race', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.CHAR(36).BINARY,
            defaultValue: Sequelize.UUIDV4,
        },
    }, {
        tableName: 'race',
    });

    Race.prototype.toFullJSON = async function toFullJSON() {
        return {};
    };

    Race.associate = function ({Race}) {

    };
    return Race;
};
