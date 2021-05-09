<template>
    <div class="page-conponent-container_login">
        <!-- <img class="xupt" src='@/assets/images/xupt.png' /> -->
        <!-- <img class="logo" src="@/assets/images/js.png" /> -->
        <el-form
            class="login"
            :model="formData"
            label-width="80px"
            ref="login"
            :rules="loginRules"
        >
            <el-form-item
                label="用户名"
                prop="userName"
            >
                <el-input placeholder="请输入用户名" v-model="formData.userName"></el-input>
            </el-form-item>

            <el-form-item
                label="密码"
                prop="password"
            >
                <el-input v-model="formData.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { Input, Form, FormItem, Button, Message, MessageBox } from 'element-ui';

import { doLogin } from '@/services/login.js';

export default {
    name: 'login',
    components: {
        ElInput: Input,
        ElForm: Form,
        ElFormItem: FormItem,
        ElButton: Button,
    },
    data() {
        const self = this;
        return {
            formData: {
                userName: '',
                password: '',
            },
            loginRules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: true },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: true },
                ],
            }
        };
    },
    methods: {
        submit() {
            this.$refs.login.validate(async valid => {
                if (valid) {
                    const res = await doLogin(this.formData);
                    const { code, data, message } = res.data;
                    if (code === 200) {
                        Message({
                            type: 'success',
                            message: '登录成功',
                        });
                        this.$router.push({
                            path: '/product'
                        })
                       this.$store.commit('sso:user:login', data);
                       localStorage.setItem('sso:user:login', JSON.stringify(data));
                    } else {
                        MessageBox({
                            type: 'error',
                            message,
                            title: '操作失败',
                        });
                    }
                }
            });
        }
    }
}
</script>
<style lang="less" scoped>
.page-conponent-container_login {
    .xupt {
        width: 56px;
        float: left;
        margin-top: 45px;
        margin-left: 45px;
    }
    img.logo {
        margin-left: 15%;
        width: 900px;
    }
    .login {
        width: 600px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 150px;
    }
}
</style>
