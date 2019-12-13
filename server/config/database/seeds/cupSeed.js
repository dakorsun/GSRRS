import '../../../src/models'
import {sequelize} from '../../../src/setup/sequelize';
const {Cup} = sequelize.models;

const isTest = process.env.NODE_ENV === 'development';


const cupTestSeed = async (t) => {
    try {
        const cup = await Cup.create({isActual: true}, {transaction: t});
        await cup.createConfig({}, {transaction: t})
    } catch (err) {
        console.error(err);
    }
};

const cupSeed = async () => {

}

export default isTest ? cupTestSeed : cupSeed;
