<template>
    <div class="page-conponent-container__product" v-loading="loading">
        <el-form
            :model="formData"
            :inline="true"
        >
            <el-form-item
                label="商品名称"
            >
                <el-input placeholder="请输入商品名称" v-model="formData.name" @keyup.enter.native="updateData"></el-input>
            </el-form-item>
            <el-form-item
                label="商品类型"
            >
                <el-select
                    v-model="formData.type"
                    placeholder="请选择商品类型"
                    @change="updateData"
                    clearable
                >
                    <el-option
                        v-for="item in productTypeOptions"
                        :key="item.id"
                        :value="item.name"
                        :label="item.name"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                label="上架状态"
            >
                <el-select
                    v-model="formData.status"
                    placeholder="请选择上架状态"
                    @change="updateData"
                    clearable
                >
                    <el-option
                        v-for="item in ['已上架', '已下架']"
                        :key="item"
                        :value="item"
                        :label="item"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="createProduct"
                >
                    创建商品
                </el-button>
            </el-form-item>
        </el-form>
        <el-table
            :data="data"
            border
        >
            <el-table-column
                prop="name"
                label="商品名称"
            >
            </el-table-column>
            <el-table-column
                prop="detail"
                label="商品描述"
            ></el-table-column>
            <el-table-column
                prop="type"
                label="商品类型"
            >
            </el-table-column>
            <el-table-column
                prop="price"
                label="价格"
            >
            </el-table-column>
            <el-table-column
                prop="sales"
                label="销量"
            >
            </el-table-column>
            <el-table-column
                prop="status"
                label="下架状态"
            ></el-table-column>
            <el-table-column
                prop="stock"
                label="库存"
            ></el-table-column>
            <el-table-column
                prop="insertTime"
                label="创建时间"
            ></el-table-column>
            <el-table-column
                prop="updateTime"
                label="更新时间"
            ></el-table-column>
            <el-table-column
                label="操作"
            >
                <template slot-scope="{ row }">
                    <el-link v-if="row.status === '已下架'" type="primary" @click="upCargo(row)">上架</el-link>
                    <el-link v-if="row.status === '已上架'" type="primary" @click="downCargo(row)">下架</el-link>
                    <el-link v-if="row.status === '已下架'" type="primary" @click="editCargo(row)">编辑</el-link>
                </template>
            </el-table-column>
        </el-table>
        <create-edit-product
            v-if="showUpdateProductDialog"
            :visible="showUpdateProductDialog"
            @onclose="showUpdateProductDialog = false; updateData()"
            :mode="mode"
            :data="curProduct"
        >
        </create-edit-product>
    </div>
</template>
<script>
import { Table, TableColumn, Form, FormItem, Select, Option, Input, Button, Link, Message, MessageBox } from 'element-ui';
import CreateEditProduct from './components/create-edit-product.vue';

import { mapState } from 'vuex';

import { getProductList, getProductType, upCargo, downCargo } from '@/services/product.js'

export default {
    name: 'product',
    components: {
        ElForm: Form,
        ElFormItem: FormItem,
        ElSelect: Select,
        ElOption: Option,
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElInput: Input,
        ElButton: Button,
        ElLink: Link,
        CreateEditProduct,
    },
    data() {
        return {
            loading: false,
            showUpdateProductDialog: false,
            data: [],
            productTypeOptions: [],
            formData: {
                name: '',
                type: '',
                status: '',
            },
            pagenation: {
                pageNum: 1,
                total: 0,
                pageSize: 10,
            },
            mode: 'create',
            curProduct: null,
        }
    },
    async created() {
        await this.updateData();
        this.updateProductTypeOptions();
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
        }),
        query() {
            const { name, type, status } = this.formData;
            const { pageNum } = this.pagenation;
            return {
                pageNum,
                name,
                type,
                status,
            };
        }
    },
    methods: {
        async updateData() {
            this.loading = true;
            const res = await getProductList(this.query);
            const { code, data, message } = res.data;
            this.data = data.list ? data.list : [];
            this.pagenation = {
                pageNum: data.pageNum,
                total: data.total,
                pageSize: data.pageSize,
            };
            this.loading = false;
        },
        async updateProductTypeOptions() {
            const res = await getProductType();
            const { code, data, message } = res.data;
            this.productTypeOptions = data;
        },
        createProduct() {
            this.showUpdateProductDialog = true;
            this.mode = 'create';
        },
        editCargo(row) {
            this.mode = 'edit';
            this.showUpdateProductDialog = true;
            this.curProduct = row;
        },
        async upCargo(row) {
            const res = await upCargo({
                id: row.id,
            });
            const { code, message, data } = res.data;
            if (code === 200) {
                Message({
                    message: `商品上架成功`,
                    type: 'success',
                });
            } else {
                MessageBox({
                    type: 'error',
                    message,
                    title: '操作失败',
                });
            }
            this.updateData();
        },
        async downCargo(row) {
            const res = await downCargo({
                id: row.id,
            });
            const { code, message, data } = res.data;
            if (code === 200) {
                Message({
                    message: `商品下架成功`,
                    type: 'success',
                });
            } else {
                MessageBox({
                    type: 'error',
                    message,
                    title: '操作失败',
                });
            }
            this.updateData();
        }
    }
}
</script>
<style lang="less" scoped>
.page-conponent-container__product {
    padding: 24px;
}
</style>
