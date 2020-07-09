import Vue from 'vue';
import Vuex from 'vuex';

import finder from './finder'
import search from './search'
import error from './error'
import loader from './loader'
import sort from './sort'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        finder,
        search,
        error,
        loader,
        sort
    }
})
