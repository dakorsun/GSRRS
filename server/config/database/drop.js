import('../../src/models');
import {sequelize} from '../../src/setup/sequelize';

const index = async () => {
    try {
        await sequelize.transaction(async t => {
            await sequelize.drop({transaction: t});

            console.log('Database tables successfully created');

        });
        process.exit(0)

    } catch (err) {
        console.error(err);
        process.exit(1)
    }
};

index();