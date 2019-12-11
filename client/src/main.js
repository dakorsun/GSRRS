import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store'
import * as io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io';

const socketServer = 'http://localhost:3003';

Vue.use(new VueSocketIO({
        debug: true,
        connection: io(socketServer), //options object is Optional
        vuex: {
            store,
            actionPrefix: "SOCKET_",
            mutationPrefix: "SOCKET_"
        }
    })
);

Vue.config.productionTip = false;


new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
