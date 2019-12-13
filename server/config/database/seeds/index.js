import {sequelize} from '../../../src/setup/sequelize';
import usersSeed from './usersSeed'
import '../../../src/models'
import cupSeed from "./cupSeed";

const isTest = process.env.NODE_ENV === 'development';

const testSeed = async () => {
    try {
        await sequelize.transaction(async t => {

            await sequelize.drop({transaction: t});
            await sequelize.sync({transaction: t});
            console.log('Database tables successfully created');
            await usersSeed(18, t);
            await cupSeed();
        });
    } catch (err) {
        console.error(err);
    }
};

const seed = async () => {

}

export default isTest ? testSeed : seed;

