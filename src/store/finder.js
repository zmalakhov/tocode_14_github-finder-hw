import axios from "axios";

export default {
    state: {
        user: null,
        repos: []
    },
    mutations: {
        setUser(state, payload){
            state.user = payload
        },
        setRepos(state, payload){
            state.repos = payload
        },
    },
    actions: {
        setUser({commit}, payload){
            commit('setUser', payload)
        },
        setRepos({commit}, payload){
            commit('setRepos', payload)
        },
        loadDataLazy({commit, dispatch}){
            commit('setLoading', true)
            setTimeout(() =>{
                dispatch('loadData')
            }, 500)
        },
        async loadData({commit, getters, dispatch}){
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
                    commit('setRepos', reposResponse.data)

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
        getUser(state){
            return state.user
        },
        getRepos(state){
            return state.repos
        },
    }
}
