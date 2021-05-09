<template>
    <div class="page-component-container__profile-dialog" v-if="userInfo">
        <el-dialog
            title="修改密码"
            :visible.sync="visible"
            width="30%"
            @close="onClose"
        >
            <el-form>
                <el-form-item
                    label="工号"
                >
                    <span>{{userInfo.jobNumber}}</span>
                </el-form-item>
                <el-form-item
                    label="姓名"
                >
                    <span>{{userInfo.name}}</span>
                </el-form-item>
                <el-form-item
                    label="学院"
                >
                    <span>{{userInfo.college}}</span>
                </el-form-item>
                <el-form-item
                    label="职级"
                >
                    <span>{{userInfo.title}}</span>
                </el-form-item>
            </el-form>
            <template slot="footer">
                <el-button type="primary" @click="onClose">关闭</el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import { Dialog, Button, Form, FormItem } from 'element-ui';

import { mapState } from 'vuex';
export default {
    name: 'profile-dialog',
    components: {
        ElDialog: Dialog,
        ElButton: Button,
        ElFormItem: FormItem,
        ElForm: Form,
    },
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
        })
    },
    methods: {
        onClose() {
            this.$emit('onclose');
        }
    }
}
</script>
<style scoped lang="less">
</style>
