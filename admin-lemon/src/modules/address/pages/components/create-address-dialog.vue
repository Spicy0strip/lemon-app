<template>
    <div class="page-component-container__create-address-dialog">
        <el-dialog
            title="创建取货地址"
            :visible.sync="visible"
            width="30%"
            @close="onClose"
        >
            <el-form label-width="100px" :model="formData" ref="address">
                <el-form-item
                    label="地址名称"
                >
                    <el-input
                        placeholder="请输入地址名称"
                        v-model="formData.addressName"
                    >
                    </el-input>
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
import { Dialog, Button, Form, FormItem, Select, Option, Input, Message, MessageBox} from 'element-ui';

import { createAddress } from '@/services/address.js'

export default {
    name: 'create-address-dialog',
    components: {
        ElDialog: Dialog,
        ElButton: Button,
        ElFormItem: FormItem,
        ElForm: Form,
        ElInput: Input,
        ElSelect: Select,
        ElOption: Option,
    },
    data() {
        return {
            formData: {
                addressName: '',
            }
        }
    },
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onClose() {
            this.$emit('onclose');
        },
        submit() {
            this.$refs.address.validate(async (valid) => {
                if (valid) {
                    const res = await createAddress(this.formData);
                    const { code, message, data } = res.data;
                    if (code === 200) {
                        Message({
                            message: `新增取货地址成功`,
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
        },
    }
}

</script>

<style scoped lang="less">
</style>
