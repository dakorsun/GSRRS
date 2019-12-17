import Sequelize from 'sequelize';

export default (sequelize, {CHAR, STRING}) => {
    const CupParticipant = sequelize.define('CupParticipant', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: CHAR(36).BINARY,
            defaultValue: Sequelize.UUIDV4,
        },
    }, {
        tableName: 'cupParticipant',
    });

    CupParticipant.prototype.toFullJSON = async function toFullJSON() {
        return {};
    };

    CupParticipant.associate = function ({CupParticipant}) {

    };
    return CupParticipant;
};
