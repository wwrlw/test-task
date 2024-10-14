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
      },
      SET_REQUEST(state, requests) {
        state.requests = requests;
      },

    },

    actions: {
        async login ({commit}, credentials) {
            try {
                const  response = await axios.post('https://dev.moydomonline.ru/api/auth/login/', credentials);
                const token = response.data.key
                axios.defaults.headers.common['Authorization'] = `Token ${token}`
                commit('SET_TOKEN', token);
                commit('SET_ERROR', null);

            } catch (error) {
                commit('SET_ERROR', 'Invalid data')
            }
        },
        async FetchData ({commit}) {
            try {
                const token = store.state.token || localStorage.getItem('token')
                const response = await axios.get('https://dev.moydomonline.ru/api/appeals/v1.0/appeals/ ', {
                    headers: {
                        Authorization: `Token ${token}`
                    },
                    params: {
                    }

                });
                commit('SET_REQUEST', response.data)
            } catch (error) {
                console.log(error)
            }
        }
    },
    getters: {
        isAuthenticated: state => !!state.token,
        error: state => state.error,
        requests: state => state.requests
    }

})

export default store;
