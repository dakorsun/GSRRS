import ntw from 'number-to-words'
import _capitalize from 'lodash/capitalize'

import {USER_ROLES} from "../../../util/constants/user";

const {ROLE_RACER} = USER_ROLES;
import '../../../src/models'
import {sequelize} from '../../../src/setup/sequelize';
const {User} = sequelize.models;

const isTest = process.env.NODE_ENV === 'development';


const users = [
    {
        email: 'firstRacer@gmail.com',
        firstName: 'First',
        lastName: 'Racer',
        gender: 'Male',
        role: ROLE_RACER
    },
    {
        email: 'secondRacer@gmail.com',
        firstName: 'Second',
        lastName: 'Racer',
        gender: 'Male',
        role: ROLE_RACER
    }
];
const userBuilder = (i) => {
    const word = ntw.toWordsOrdinal(i);
    const firstName = _capitalize(word);
    const lastName = 'Racer';
    return {
        email: `${word + lastName}@gmail.com`,
        firstName,
        lastName,
        gender: 'Male',
        role: ROLE_RACER
    }
}

// console.log('users tbd:', users);

const usersTestSeed = (amount, t) => {
    console.log('amount: ', amount);

    if (amount) {
        const arr = [];
        let i = 0;
        while (i < amount) {
            i++
            arr.push(userBuilder(i))
        }
        // console.log('users.length: ', arr)
        return Promise.all(arr.map((user) => {
            return User.create(user, {transaction: t})
        }))
    } else {
        return Promise.all(users.map(user => {
            return User.create(user, {transaction: t});
        }));
    }
};

const usersSeed = () => {

}


export default isTest ? usersTestSeed : usersSeed;