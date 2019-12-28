import Vue from "vue";
import Vuex from "vuex"
import getters from "./getters";
import chat from "./modules/chat"
import login from "./modules/login"
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        login,
        chat
    },
    getters
})

export default store
