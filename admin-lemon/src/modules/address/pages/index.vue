<template>
    <div class="page-conponent-container__address" v-loading="loading">
        <el-form
            :inline="true"
        >
            <el-form-item
            >
                <el-button type="primary" @click="createAddress">创建取货地址</el-button>
            </el-form-item>
        </el-form>
        <el-table
            :data="address"
            border
        >
            <el-table-column
                label="地址"
                prop="name"
            >
            </el-table-column>
        </el-table>
        <create-address-dialog
            v-if="showCreateAddressDialog"
            :visible="showCreateAddressDialog"
            @onclose="showCreateAddressDialog = false; updateData()"
        ></create-address-dialog>
    </div>
</template>
<script>

import { Button, Table, TableColumn, Form, FormItem } from 'element-ui';
import CreateAddressDialog from './components/create-address-dialog.vue';

import { getAddressList } from '@/services/address.js';

export default {
    name: 'address',
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElButton: Button,
        ElFormItem: FormItem,
        ElForm: Form,
        CreateAddressDialog,
    },
    data() {
        return {
            loading: false,
            address: [],
            showCreateAddressDialog: false,
        }
    },
    async created() {
        await this.updateData();
    },
    methods: {
        async updateData() {
            this.loading = true;
            const res = await getAddressList();
            const { code, data, message } = res.data;
            this.address = data ? data.map(item => ({ name: item})) : [];
            this.loading = false;
        },
        createAddress() {
            this.showCreateAddressDialog = true;
        }
    }
}
</script>
<style lang="less" scoped>
.page-conponent-container__address {
    padding: 24px;
}
</style>
