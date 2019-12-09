import {sequelize} from '../../src/setup/sequelize';
import usersSeed from './seeds/usersSeed'
import testSeed from './seeds/testSeed'


const index = async () => {
    try {
        await sequelize.transaction(async t => {
            await sequelize.drop({transaction: t});
            await sequelize.sync({transaction: t});
            console.log('Database tables successfully created');

            const userInstances = await usersSeed(18);
            await testSeed(userInstances);

        });
        process.exit(0)

    } catch (err) {
        console.error(err);
        process.exit(1)
    }
};

index();