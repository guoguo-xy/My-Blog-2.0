import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        loginUser: {}
    },
    mutations: {
        setUser: (state, loginUser) => {
            state.loginUser = loginUser;
            var user = JSON.stringify(loginUser);
            localStorage.setItem('user', user)

        },
    },
    actions: {
        setToken: (state, token) => {
            state.token = token;
            localStorage.setItem('mytoken', token)
        },
        logout: state => {
            state.token = null;
            localStorage.removeItem('mytoken');
            localStorage.removeItem('user');
        },

    },
    modules: {}
})