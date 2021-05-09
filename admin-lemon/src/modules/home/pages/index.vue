<template>
    <div class="page-component-container__home" v-if="userInfo">
        <el-menu
            :default-active="activeName"
            class="home-menu home-menu-item"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true"
        >
            <el-menu-item index="product" route="/product">
                <i class="menu-item-icon lemon">&#xe665;</i>
                <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="order" route="/order">
                <i class="menu-item-icon lemon">&#xe65d;</i>
                <span slot="title">订单管理</span>
            </el-menu-item>
            <el-menu-item index="address" route="/address">
                <i class="menu-item-icon lemon">&#xe644;</i>
                <span slot="title">取货地址管理</span>
            </el-menu-item>
        </el-menu>
        <div class="home-content">
            <header class="home-header">
                <el-dropdown class="profile" :hide-on-click="false">
                    <span class="el-dropdown-link">
                        <i class="lemon avatar">&#xe60c;</i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                    </el-dropdown-menu>
                </el-dropdown>
            </header>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>

import { Menu, Submenu, MenuItemGroup, MenuItem, Button, Dropdown, DropdownItem, DropdownMenu } from "element-ui";

import { mapState } from 'vuex';

export default {
    name: 'index',
    components: {
        ElMenu: Menu,
        ElSubmenu: Submenu,
        ElMenuItemGroup: MenuItemGroup,
        ElMenuItem: MenuItem,
        ElButton: Button,
        ElDropdown: Dropdown,
        ElDropdownItem: DropdownItem,
        ElDropdownMenu: DropdownMenu,
    },
    data () {
        return {
            showUpdatPasswordeDialog: false,
            showCheckProfileDialog: false,
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo,
        }),
        activeName() {

            return this.$route.name;
        }
    },
    watch: {
        activeName: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.$router.push({ name: val }).catch(() => {});
                }
            }
        }
    },
    methods: {
    }
}
</script>
<style lang="less" scoped>
.page-component-container__home {
    display: flex;
    .home-menu {
        width: 200px;
        position: absolute;
        bottom: 0;
        top: 0;
        .menu-item-icon {
            font-size: 20px;
        }
    }
    .home-content {
        margin-left: 200px;
        flex: 1;
        .home-header {
            line-height: 56px;
            height: 56px;
            box-shadow: 0 2px 3px -1px rgb(0 0 0 / 4%),
                0 2px 8px 2px rgb(0 0 0 / 2%), 0 4px 7px 1px rgb(0 0 0 / 5%);

            .profile {
                float: right;
                margin-right: 12px;
                cursor: pointer;
            }
            .avatar {
                font-size: 32px;
            }
        }
    }
}
</style>
