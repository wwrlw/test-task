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
      // SET_HOME(state, requests) {
      //  state.requests = requests
      // }

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
        async FetchData ({commit}, params={}) {
            try {
                const token = store.state.token || localStorage.getItem('token')
                const response = await axios.get('https://dev.moydomonline.ru/api/appeals/v1.0/appeals/', {
                    headers: {
                        Authorization: `Token ${token}`
                    },
                    params: {
                        search: params.search || '',
                        premise_id: params.premise_id || '',
                        page: params.page || 1,
                        page_size: params.page_size || 10,
                    }

                });
                commit('SET_REQUEST', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        // async FetchHome({commit}) {
        //     try {
        //         const token = localStorage.getItem('token') || store.state.token;
        //         const response = await axios.get('https://dev.moydomonline.ru/api/geo/v2.0/user-premises/', {
        //             headers: {
        //                 Authorization: `Token ${token}`
        //             }
        //
        //         });
        //         commit('SET_HOME', response.data)
        //     } catch (e) {
        //         console.log(e)
        //     }
        // }

    },
    getters: {
        isAuthenticated: state => !!state.token,
        error: state => state.error,
        requests: state => state.requests
    }

})

export default store;
