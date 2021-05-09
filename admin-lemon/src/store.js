import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userInfo: null,
    },
    getters: {
        userInfo: state => {
            return state.userInfo;
        }
    },
    mutations: {
        'sso:user:login'(state, userInfo) {
            state.userInfo = userInfo;
        },
        updateUserInfo(state, info) {
            state.userInfo = {
                ...state.userInfo,
                ...info,
            };
        }
    },
    actions: {
    },
});
