import WebIM from "../../utils/WebIM";
import {setCookie} from "../../utils/cookie";

const state = {
    userName:"",
    userPwd:"",
}
const mutations = {
    "SET_USERUINFO":(state,options)=>{
        state.userName = options.user
        state.userPwd = options.pwd
    }
}
const actions={
    login({commit},options){
        let webImOption = {
            apiUrl: WebIM.config.apiURL,
            user: options.user,
            pwd: options.pwd,
            appKey: WebIM.config.appkey
        }
        WebIM.conn.open(webImOption)
        setCookie("userInfo",options)
        commit("SET_USERUINFO",options)
    }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}
