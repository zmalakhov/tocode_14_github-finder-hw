export default {
    state: {
        currentSort: 'name',
        // currentSortDir: 'asc',
        currentSortDir: 'desc',
    },
    mutations: {
        setSort(state, payload) {
            state.currentSort = payload
        },
        setSortDir(state, payload) {
            state.currentSortDir = payload
        }
    },
    actions: {
        setSort({commit, getters, dispatch}, status) {
            let sort = getters.getCurrentSort
            let sortDir = getters.getCurrentSortDir

            if (status === sort) {
                //this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
                sortDir = sortDir === 'asc' ? 'desc' : 'asc'
                commit('setSortDir', sortDir);
            }
            commit('setSort', status);
        },

    },
    getters: {
        getCurrentSort(state) {
            return state.currentSort
        },
        getCurrentSortDir(state) {
            return state.currentSortDir
        },
    }
}
