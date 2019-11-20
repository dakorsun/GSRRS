import('../../src/models');
import {sequelize} from '../../src/setup/sequelize';

sequelize.drop()
    .then(() => sequelize.sync())
    .then(() => {
        console.log('Database tables successfully created');
        process.exit(0)
    })
    .catch((error) => {
        console.error(error);
        process.exit(1)
    });

