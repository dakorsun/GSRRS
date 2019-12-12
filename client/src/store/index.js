import Vuex from 'vuex';
import Vue from 'vue';
import race from './modules/race'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        race
    }
})