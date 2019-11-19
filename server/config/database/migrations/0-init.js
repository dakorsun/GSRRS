import '../../../server/models';
import { sequelize } from '../../../src/setup/sequelize';

module.exports = {
    up: (queryInterface, Sequelize) => sequelize.sync(),
};
