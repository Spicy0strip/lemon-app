<template>
    <div class="page-component-container__update-password-dialog">
        <el-dialog
            title="修改密码"
            :visible.sync="visible"
            width="30%"
            @close="onClose"
        >
            <el-form
                :model="formData"
                label-width="70px"
                :rules="rules"
                ref="password"
            >
                <el-form-item
                    label="工号"
                    prop="jobNumber"
                >
                    <el-input disabled v-model="formData.jobNumber"></el-input>
                </el-form-item>
                <el-form-item
                    label="旧密码"
                    prop="oldPassword"
                >
                    <el-input v-model="formData.oldPassword"></el-input>
                </el-form-item>
                <el-form-item
                    label="新密码"
                    prop="newPassword"
                >
                    <el-input v-model="formData.newPassword"></el-input>
                </el-form-item>
            </el-form>
            <template slot="footer">
                <el-button @click="onClose">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import { Form, FormItem, Dialog, Input, Button, Message, MessageBox } from 'element-ui';

import { mapState } from 'vuex';

import { updatePassword } from '@/services/login.js';

export default {
    name: 'update-password-dialog',
    components: {
        ElForm: Form,
        ElFormItem: FormItem,
        ElDialog: Dialog,
        ElInput: Input,
        ElButton: Button,
    },
    data() {
        return {
            formData: {
                jobNumber: '',
                oldPassword: '',
                newPassword: '',
            },
            rules: {
                jobNumber: [
                    { required: true, message: '请输入工号', trigger: true },
                ],
                oldPassword: [
                    { required: true, message: '请输入旧密码', trigger: true },
                ],
                newPassword: [
                    { required: true, message: '请输入新密码', trigger: true },
                ],
            }
        }
    },
    props: {
        visible: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
        }),
    },
    created() {
        this.formData.jobNumber = this.userInfo.jobNumber;
    },
    methods: {
        onClose() {
            this.$emit('onclose');
        },
        submit() {
            this.$refs.password.validate(async (valid) => {
                if (valid) {
                    const res = await updatePassword(this.formData);
                    const { code, message, data } = res.data;
                    if (code === 200) {
                        Message({
                            message: '密码修改成功',
                            type: 'success',
                        });
                    } else {
                        MessageBox({
                            type: 'error',
                            message,
                            title: '操作失败',
                        });
                    }
                    this.onClose();
                }
            })
        }
    }
}
</script>
<style scoped lang="less">
</style>
