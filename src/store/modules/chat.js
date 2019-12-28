import WebIM from "../../utils/WebIM";

const state = {
    friendsList: [],
    groupsList: []
}
const mutations = {
    "SET_FRIENDSLIST": (state, friendsList) => {
        state.friendsList = friendsList
    },
    "SET_GROUPSLIST": (state, groupsList) => {
        state.groupsList = groupsList
    }
}
const actions = {
    getFriendsList({commit}) {
        return new Promise((resolve,reject) => {
            let friendsList = []
            WebIM.conn.getRoster({
                success: function (roster) {
                    for (let i = 0, l = roster.length; i < l; i++) {
                        let ros = roster[i];
                        if (ros.subscription === 'both' || ros.subscription === 'to') {
                            friendsList.push(ros)
                        }
                    }
                    commit("SET_FRIENDSLIST", friendsList)
                    resolve()
                },
                error:function () {
                    reject()
                }
            })
        })
    },
    getGroupsList({commit}) {
        return new Promise((resolve,reject)=>{
                let options = {
                    success: function (roster) {
                        commit("SET_GROUPSLIST", roster)
                        resolve()
                    },
                    error:function () {
                        reject();
                    }
                }
                WebIM.conn.getGroup(options)
        })
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}
