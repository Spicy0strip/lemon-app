<template>
    <div class="page-component-container__create-product">
        <el-dialog
            title="创建商品"
            :visible.sync="visible"
            width="30%"
            @close="onClose"
        >
            <el-form label-width="100px" :model="formData" ref="product">
                <el-form-item
                    label="商品名称"
                >
                    <el-input
                        placeholder="请输入商品名称"
                        v-model="formData.name"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item
                    label="描述"
                >
                    <el-input
                        placeholder="请输入商品描述"
                        v-model="formData.detail"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item
                    label="单价"
                >
                    <el-input
                        placeholder="请输入商品单价"
                        v-model.number="formData.price"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item
                    label="库存"
                >
                    <el-input
                        placeholder="商品库存，单位为g"
                        v-model.number="formData.stock"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item
                    label="重量"
                >
                    <el-input
                        placeholder="商品每份的重量，单位为g"
                        v-model.number="formData.weight"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item
                    label="图片"
                >
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-success="savePictureUrl"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item
                    label="商品类型"
                >
                    <el-select
                        v-model="formData.type"
                        placeholder="请选择商品类型"
                        style="width: 100%;"
                    >
                        <el-option
                            v-for="item in productTypeOptions"
                            :key="item.id"
                            :value="item.name"
                            :label="item.name"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <template slot="footer">
                <el-button @click="onClose">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </template>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
import { Dialog, Button, Form, FormItem, Select, Option, Input, Upload } from 'element-ui';

import { mapState } from 'vuex';

import { createProduct, getProductType, updateProduct } from '@/services/product.js'
export default {
    name: 'create-product',
    components: {
        ElDialog: Dialog,
        ElButton: Button,
        ElFormItem: FormItem,
        ElForm: Form,
        ElInput: Input,
        ElSelect: Select,
        ElOption: Option,
        ElUpload: Upload,
    },
    data () {
        return {
            formData: {
                name: '',
                detail: '',
                price: undefined,
                weight: undefined,
                stock: undefined,
                type: '',
                image: '',
            },
            productTypeOptions: [],
            dialogVisible: false,
            dialogImageUrl: '',
        }
    },
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        mode: {
            type: String,
            default: 'create',
        },
        data: {
            type: [Object, null],
            default: null,
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
        })
    },
    created () {
        this.updateProductTypeOptions();
    },
    methods: {
        onClose() {
            this.$emit('onclose');
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        savePictureUrl(response, file, fileList) {
            console.log(response, file, fileList);
            this.formData.image = file.url;
        },
        submit() {
            this.$refs.product.validate(async (valid) => {
                if (valid) {
                    const { mode } = this;
                    const res = mode === 'create' ? await createProduct(this.formData) : await updateProduct(this.formData);
                    const { code, message, data } = res.data;
                    if (code === 200) {
                        Message({
                            message: `商品${mode === 'create' ? '创建' : '修改'}成功`,
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
        async updateProductTypeOptions() {
            const res = await getProductType();
            const { code, data, message } = res.data;
            this.productTypeOptions = data;
        }
    }
}
</script>
<style scoped lang="less">
</style>
