<template>
    <section class="login-container">
        <el-row>
            <el-col :span="6" :offset="9">
                <el-form :model="form">
                    <el-form-item label="用户名">
                        <el-input type="text" v-model="form.user"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input type="password" v-model="form.pwd"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>
    </section>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return {
                form:{
                    user:"18715004759",
                    pwd:"88888888"
                }
            }
        },
        methods:{
            login(){
                let {form } = this;
                let data = {
                    user: form.user,
                    pwd: form.pwd
                }
                this.$store.dispatch("login/login",data)
            }
        }
    }
</script>

<style scoped lang="scss">
    .login-container{

    }
</style>
