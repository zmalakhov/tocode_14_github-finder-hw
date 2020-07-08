export default {
    state: {
        search: ''
    },
    mutations: {
        setSearch(state, payload) {
            state.search = payload
        }
    },
    actions: {
        setSearch({commit}, payload) {
            commit('setSearch', payload);
        }
    },
    getters: {
        getSearch(state) {
            return state.search
        }
    }
}
