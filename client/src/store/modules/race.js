// import API from '../../api';

const state = {
    race: {
        id: 'id',
        targetDistance: 1000,
        racer: {
            id: 'id-unique',
            nickname: 'racerSingle',
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

const actions = {
    setResult({commit}, result){
        commit('setResult', result)
    },
    concatResult({commit}){
        commit('concatResult');
    }
};

const mutations = {
    setResult: (state, result) => (state.race.racer.result = result),
    concatResult: (state) => (state.race.racer.result = state.race.racer.result + 10),
    ['SOCKET_RUN_RESULT']: (state, result) => (state.race.racer.result = result),
    ['RUN_RESULT']: (state, result) => (state.race.racer.result = result),
};

export default {
    state,
    getters,
    actions,
    mutations
};