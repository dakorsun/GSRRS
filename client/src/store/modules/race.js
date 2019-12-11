// import API from '../../api';

const state = {
    race: {
        id: 'id',
        targetDistance: 1000,
        racer: {
            id: 'id-1',
            nickname: 'racerOne',
            result: 0
        },
    },
    battle: {
        id: 'id',
        targetDistance: 1000,
        racers: [
            {
                id: 'id-1',
                nickname: 'racerOne',
                result: 0
            },
            {
                id: 'id-2',
                nickname: 'racerTwo',
                result: 0
            }
        ]
    }
};

const getters = {
    race: state => state.race
};

const actions = {};

const mutations = {};

export default {
    state,
    getters,
    actions,
    mutations
};