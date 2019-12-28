const getters = {
    userName:state=>state.login.userName,
    userPwd:state=>state.login.userPwd,
    friendsList:state=>state.chat.friendsList,
    groupsList:state=>state.chat.groupsList
}
export default getters
