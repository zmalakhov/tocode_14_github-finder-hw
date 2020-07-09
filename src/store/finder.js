import loadMore from '../assets/js/loadMore'
import setFlag from '../assets/js/setFlag'
import setSortBy from '../assets/js/setSortBy'
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
                    commit('setError', null)
                    commit('setUser', userResponse.data)

                    let res = setFlag(reposResponse.data, loadCount)
                    commit('setRepos', res.reposOther)
                    commit('setReposMain', res.reposMain)
                }))
                .catch(error => {
                    commit('setRepos', null)
                    commit('setUser', null)
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
            return state.repos.filter(rep => {
                return rep.main === false
            })
        },

        getReposMain(state, getters) {
            // return state.reposMain

            let sort = getters.getCurrentSort
            let sortDir = getters.getCurrentSortDir
            let res = setSortBy(state.reposMain,sort,sortDir)
            return res

        },
    }
}
