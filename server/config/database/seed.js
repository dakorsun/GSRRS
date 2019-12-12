import {sequelize} from '../../src/setup/sequelize';
import usersSeed from './seeds/usersSeed'
import seed from './seeds/seed'


const index = async () => {
    try {
        await sequelize.transaction(async t => {
            await sequelize.drop({transaction: t});
            await sequelize.sync({transaction: t});
            console.log('Database tables successfully created');

            const userInstances = await usersSeed(18);
            await seed(userInstances);

        });
        process.exit(0)

    } catch (err) {
        console.error(err);
        process.exit(1)
    }
};

index();