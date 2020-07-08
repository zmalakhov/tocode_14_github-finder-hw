import loadMore from '../assets/js/loadMore'
import setFlag from '../assets/js/setFlag'
import axios from "axios";

const loadCount = 4

export default {
    state: {
        user: null,
        repos: [],
        reposMain: [],
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setRepos(state, payload) {
            state.repos = payload
        },
        setReposMain(state, payload) {
            state.reposMain = payload
        },
        loadRepos(state, payload) {
            state.reposMain = [...state.reposMain, ...payload]
        }

    },
    actions: {
        setUser({commit}, payload) {
            commit('setUser', payload)
        },
        setRepos({commit}, payload) {
            commit('setRepos', payload)
        },
        setReposMain({commit}, payload) {
            commit('setReposMain', payload)
        },
        loadRepos({commit, getters}) {
            let res = getters.getReposFilter
            commit('loadRepos', loadMore(res, loadCount))
        },

        loadDataLazy({commit, dispatch}) {
            commit('setLoading', true)
            setTimeout(() => {
                dispatch('loadData')
            }, 500)
        },
        async loadData({commit, getters, dispatch}) {
            axios.all([axios.get(`https://api.github.com/users/${getters.getSearch}`),
                axios.get(`https://api.github.com/users/${getters.getSearch}/repos`)])
                .then(axios.spread((userResponse, reposResponse) => {
                    // console.log(userResponse.data,reposResponse.data);
                    // this.error = null

                    //this.$store.dispatch('setError', null)
                    commit('setError', null)

                    //this.user = userResponse.data
                    commit('setUser', userResponse.data)

                    // this.repos = reposResponse.data
                    let res = setFlag(reposResponse.data, loadCount)
                    //console.log(res);

                    commit('setRepos', res.reposOther)
                    // commit('setReposMain', loadMore(res) )
                    commit('setReposMain', res.reposMain)
                    //commit('loadRepos')

                }))
                .catch(error => {
                    // console.log(error)

                    // this.repos = null
                    commit('setRepos', null)

                    // this.user = null
                    commit('setUser', null)

                    // this.error = 'Can`t find this user'
                    // this.$store.dispatch('setError', 'Can`t find this user')
                    commit('setError', 'Can`t find this user')

                })
                .finally(() => {
                    commit('setLoading', false)
                })

        }
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getRepos(state) {
            return state.repos
        },
        getReposFilter(state) {

            //console.log(state.repos);

            // return state.repos.filter(rep => {
            //     return rep.main === false
            // })

            //console.log(state.repos);

            let res = state.repos.filter(rep => {
                return rep.main === false
            })

            //console.log(res);

            return res


        },

        getReposMain(state) {
            return state.reposMain
            //console.log('reposMain');
        },
    }
}
