import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: false,  // true -- does not allow state changes except via mutations
    state: {
        count: 2
    },
    getters: {
        doubleCount: state => { return state.count * 2 },
    },
    mutations: { // cannot do async FUNCTIONS
        increment(state, payload) {
            if (payload) state.count += payload;
            else state.count++
        },
        decrement(state,payload) {
            state.count-= payload;
        },
        reset(state) {
            state.count = 0;
        }
    },
    actions: {
        reset: context => {
            setTimeout(function(){
                context.commit("reset");
            },2000);

        }
    }
})