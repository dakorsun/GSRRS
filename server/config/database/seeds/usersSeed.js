import ntw from 'number-to-words'
import _capitalize from 'lodash/capitalize'

import {USER_ROLES} from "../../../util/constants/user";

const {ROLE_RACER} = USER_ROLES;
require('../../../src/models');
import {sequelize} from '../../../src/setup/sequelize';

const {User} = sequelize.models;

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

export default function usersSeed(amount) {
    console.log('amount: ', amount);
    return sequelize.transaction(t => {
        if (amount) {
            const arr = [];
            let i = 0;
            while(i < amount){
                i++
                arr.push(userBuilder(i))
            }
            console.log('arr: ', arr)
            return Promise.all(arr.map((user) => {
                return User.create(user, {transaction: t})
            }))
        } else {
            return Promise.all(users.map(user => {
                return User.create(user, {transaction: t});
            }));
        }
    })
}