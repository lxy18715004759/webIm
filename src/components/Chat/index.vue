<template>
    <section class="chat-container">
        chat
    </section>
</template>

<script>
    import WebIM from "../../utils/WebIM";
    import {getCookie} from "../../utils/cookie";

    export default {
        name: "Chat",
        data() {
            return {}
        },
        beforeMount() {
            let userInfo = getCookie("userInfo")
            let options = {
                user: userInfo.user,
                pwd: userInfo.pwd
            }
            this.$store.dispatch("login/login", options)
        },
        mounted() {
            let {initChat} = this;
            setTimeout(() => {
                this.$store.dispatch('chat/getFriendsList').then(_ => {
                    this.$store.dispatch('chat/getGroupsList').then(_ => {
                        initChat();
                    })
                })
            }, 2000)
        },
        methods: {
            initChat() {
                const that = this;
                let friendsList = that.$store.getters.friendsList
                let groupsList = that.$store.getters.groupsList.data

                layui.use("layim", function (layim) {
                    let friends = []
                    friendsList.map(item => {
                        let obj = {
                            username: "",
                            id: "",
                            status: "online",
                            sign: "做一枚轻盈的纸飞机",
                            avatar: "/statics/layui/images/head.png",
                        }
                        obj.username = item.name
                        obj.id = item.name
                        friends.push(obj)
                    })
                    let groups = []
                    groupsList.map(item => {
                        let obj = {
                            groupname: "",
                            id: "",
                            avatar: "/statics/layui/images/head.png"
                        }
                        obj.groupname = item.groupname
                        obj.id = item.groupid
                        groups.push(obj)
                    })

                    let initData = {
                        mine: {
                            "username": that.$store.getters.userName  //我的昵称
                            , "id": "100000" //我的ID
                            , "status": "online" //在线状态 online：在线、hide：隐身
                            , "sign": "在深邃的编码世界，做一枚轻盈的纸飞机" //我的签名
                            , "avatar": "/statics/layui/images/head.png" //我的头像
                        },
                        friend: [
                            {
                                "groupname": "我的好友" //好友分组名
                                , "id": 1 //分组ID
                                , "list": friends,
                            }],
                        group: groups
                    }
                    layim.config({
                        init: initData //获取主面板列表信息，下文会做进一步介绍
                        //获取群员接口（返回的数据格式见下文）
                        , members: {
                            url: '' //接口地址（返回的数据格式见下文）
                            , type: 'get' //默认get，一般可不填
                            , data: {} //额外参数
                        }
                        //上传图片接口（返回的数据格式见下文），若不开启图片上传，剔除该项即可
                        , uploadImage: {
                            url: '' //接口地址
                            , type: 'post' //默认post
                        }
                        //上传文件接口（返回的数据格式见下文），若不开启文件上传，剔除该项即可
                        , uploadFile: {
                            url: '' //接口地址
                            , type: 'post' //默认post
                        }
                        //扩展工具栏，下文会做进一步介绍（如果无需扩展，剔除该项即可）
                        , tool: [{
                            alias: 'code' //工具别名
                            , title: '代码' //工具名称
                            , icon: '&#xe64e;' //工具图标，参考图标文档
                        }]
                    });
                    //监听更换皮肤
                    layim.on('setSkin', function (filename, src) {
                        console.log(filename,src)
                    })

                    //发送消息
                    layim.on("sendMessage", function (res) {
                        //消息内容：
                        let content = res.mine.content
                        // 单聊  or   群聊
                        let chatType = res.to.type                  // friend  \  group
                        //消息类型： txt:文本消息
                        let messageType = "txt"
                        //消息接收的对象
                        let to = res.to.id
                        if (messageType === "txt") {
                            that.sendTxtMessage({chatType, messageType, content, to})
                        }

                    })
                })
            },
            /**
             * WebIm发送文本消息和表情
             * @param msgObj
             */
            sendTxtMessage(msgObj) {
                let id = WebIM.conn.getUniqueId()       // 生成本地消息id
                let msg = new WebIM.message(msgObj.messageType, id)              //创建txt类型的消息
                msg.set({
                    msg: msgObj.content,        //消息内容
                    to: msgObj.to,           // 发送给谁（id）
                    roomType: false,         //是否聊天室：false
                    ext: {
                        chatType: msgObj.chatType,               //  消息类型
                        timestamp: new Date().getTime(),         //  发送时间
                    },                 //扩展消息
                    success: function () {
                        console.log(`send ${msgObj.messageType} message success`);
                    },
                    fail: function () {
                        console.log(`send ${msgObj.messageType} message fail`);
                    }
                })
                if (msgObj.chatType === "group") {
                    msg.setGroup("groupchat")
                }
                WebIM.conn.send(msg.body)

            }

        },
    }
</script>

<style scoped>

</style>
