<template>
    <div class="page-conponent-container__order">
        <el-row class="every-module" v-if="order">
            <el-col :span="8" class="every-module__item">
                <div class="grid-content bg-purple">
                    <img src="@/assets/images/新订单.png" />
                    <div class="content">
                        <p class="name">新订单数量</p>
                        <p class="num">{{order.newOrderNumbs}}</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="8" class="every-module__item">
                <div class="grid-content bg-purple">
                    <img src="@/assets/images/取消订单.png" />
                    <div class="content">
                        <p class="name">被取消的订单数量</p>
                        <p class="num">{{order.cancelOrderNumbs}}</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="8" class="every-module__item">
                <div class="grid-content bg-purple">
                    <img src="@/assets/images/退货订单.png" />
                    <div class="content">
                        <p class="name">退货的订单数量</p>
                        <p class="num">{{order.backOrderNumbs}}</p>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="table-content">
            <el-form
                :model="formData"
                :inline="true"
            >
                <el-form-item
                    label="订单名称"
                >
                    <el-input placeholder="请输入订单名称" v-model="formData.name" @keyup.enter.native="updateData"></el-input>
                </el-form-item>
                <el-form-item
                    label="订单状态"
                >
                    <el-select
                        v-model="formData.status"
                        placeholder="请选择订单状态"
                        @change="updateData"
                        clearable
                    >
                        <el-option
                            v-for="item in ['待发货', '已发货', '退货中', '退货成功', '成功', '已取消']"
                            :key="item"
                            :value="item"
                            :label="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-table
                :data="data"
                border
                :loading="loading"
            >
                <el-table-column
                    label="订单ID"
                    prop="id"
                >
                </el-table-column>
                <el-table-column
                    label="商品id"
                    prop="cargoIds"
                >
                </el-table-column>
                <el-table-column
                    label="商品数量"
                    prop="cargoNumbs"
                >
                </el-table-column>
                <el-table-column
                    label="总价"
                    prop="totalPrice"
                >
                </el-table-column>
                <el-table-column
                    label="状态"
                    prop="status"
                >
                </el-table-column>
                <el-table-column
                    label="地址"
                    prop="address"
                >
                </el-table-column>
                <el-table-column
                    label="创建时间"
                    prop="insertTime"
                >
                </el-table-column>
                <el-table-column
                    label="更新时间"
                    prop="updateTime"
                >
                </el-table-column>
                <el-table-column
                    label="操作"
                >
                    <template slot-scope="{ row }">
                        <el-link v-if="row.status === '待发货'" type="primary" @click="sendOrder(row)">发货</el-link>
                        <el-link v-if="row.status === '退货中'" type="primary" @click="agreeExitOrder(row)">同意退款</el-link>
                        <el-link v-if="row.status === '退货中'" type="primary" @click="disAgreeExitOrder(row)">拒绝退款</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>

import { Row, Col, Form, Select, FormItem, Option, Table, TableColumn, Link, Message, MessageBox, Input } from 'element-ui';

import { getOrder, getOrderList, agreeExitOrder, sendOrder, disAgreeExitOrder } from '@/services/order.js';

export default {
    name: 'order',
    components: {
        ElRow: Row,
        ElCol: Col,
        ElForm: Form,
        ElFormItem: FormItem,
        ElSelect: Select,
        ElOption: Option,
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElInput: Input,
        ElLink: Link,
    },
    data() {
        return {
            loading: false,
            order: null,
            formData: {
                name: '',
                status: '',
            },
            pagenation: {
                pageNum: 1,
                total: 0,
                pageSize: 10,
            },
            data: [],
        }
    },
    async created() {
        await this.updateOrders();
        await this.updateData();
    },
    computed: {
        query() {
            return {
                pageNum: this.pagenation.pageNum,
                name: this.formData.name,
                status: this.formData.status,
            };
        }
    },
    methods: {
        async updateOrders() {
            const res = await getOrder();
            const { code, data, message } = res.data;
            this.order = data;
        },
        async updateData() {
            this.loading = true;
            const res = await getOrderList(this.query);
            const { code, data, message } = res.data;
            this.data = data.list ? data.list : [];
            this.pagenation = {
                pageNum: data.pageNum,
                total: data.total,
                pageSize: data.pageSize,
            };
            this.loading = false;
        },
        async disAgreeExitOrder(row) {
            const res = await disAgreeExitOrder({ id: row.id });
            const { code, data, message } = res.data;
            if (code === 200) {
                Message({
                    message: `订单拒绝退款成功`,
                    type: 'success',
                });
            } else {
                MessageBox({
                    type: 'error',
                    message,
                    title: '操作失败',
                });
            }
        },
        async agreeExitOrder(row) {
            const res = await agreeExitOrder({ id: row.id });
            const { code, data, message } = res.data;
            if (code === 200) {
                Message({
                    message: `同意退款成功`,
                    type: 'success',
                });
            } else {
                MessageBox({
                    type: 'error',
                    message,
                    title: '操作失败',
                });
            }
        },
        async sendOrder(row) {
            const res = await sendOrder({ id: row.id });
            const { code, data, message } = res.data;
            if (code === 200) {
                Message({
                    message: `订单发货成功`,
                    type: 'success',
                });
            } else {
                MessageBox({
                    type: 'error',
                    message,
                    title: '操作失败',
                });
            }
        }
    }
}
</script>
<style lang="less" scoped>
.page-conponent-container__order {
    background: #eff1f4;
}
.every-module {
    display: flex;
    justify-content: space-between;
    padding: 48px 0;
    &__item {
        background: #ffffff;
        width: 350px;
        .grid-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .content {
                margin-right: 24px;
            }
            .name {
                color: #8c8d8d;
            }
            .name,
            .num {
                font-size: 20px;
            }
        }
        img {
            width: 58px;
            height: 58px;
            margin-left: 24px;
        }
    }
}
.table-content {
    background-color: #fff;
    padding: 24px;
}
</style>
