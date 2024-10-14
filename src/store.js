import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        requests: [],
        token: localStorage.getItem('token') || null,
        error: null,
    },

    mutations: {
      SET_TOKEN(state, token) {
          state.token = token
          localStorage.setItem('token', token)
      },
      SET_ERROR(state, requests) {
          state.requests = requests;
      },
      LOGOUT(state) {
          state.token = null;
          localStorage.removeItem('token')
      }

    },

    actions: {
        async login ({commit}, credentials) {
            try {
                const  response = axios.post('https://dev.moydomonline.ru/api/auth/login/', credentials);
                const token = response.data.key
                axios.defaults.headers.common['Authorization'] = `Token ${token}`
                commit('SET_TOKEN', token);

            } catch (error) {
                commit('SET_ERROR', 'Invalid data')
            }
        }
    },
    getters: {
        isAuthenticated: state => !!state.token,
        error: state => state.error
    }

})

export default store;
