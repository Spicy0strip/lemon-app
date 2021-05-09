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
                <i class="lemon">&#xe604;</i>
                <span slot="title">商品管理</span>
            </el-menu-item>
            <!-- <el-submenu :disabled="userInfo.loginLevel !== 2" index="college-teacher">
                <template slot="title">
                    <i class="teacher">&#xe603;</i>
                    <span>学院管理</span>
                </template>
                <el-menu-item index="college-teacher" route="/college/teacher">
                    <i class="teacher">&#xe603;</i>
                    <span>老师列表</span>
                </el-menu-item>
                <el-menu-item index="college-task" route="/college/task">
                    <i class="teacher">&#xe603;</i>
                    <span>任务列表</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu :disabled="userInfo.loginLevel !== 4" index="unassign-task">
                <template slot="title">
                    <i class="teacher">&#xe606;</i>
                    <span>系部管理</span>
                </template>
                <el-menu-item :disabled="userInfo.loginLevel !== 4" index="unassign-task" route="/department/unassign-task">
                    <i class="teacher">&#xe606;</i>
                    <span>未分配任务</span>
                </el-menu-item>
                <el-menu-item :disabled="userInfo.loginLevel !== 4" index="assign-task" route="/department/assign-task">
                    <i class="teacher">&#xe606;</i>
                    <span>已分配任务</span>
                </el-menu-item>
            </el-submenu> -->
            <el-menu-item index="order" route="/order">
                <i class="lemon">&#xe605;</i>
                <span slot="title">订单管理</span>
            </el-menu-item>
            <el-menu-item index="address" route="/address">
                <i class="lemon">&#xe605;</i>
                <span slot="title">取货地址管理</span>
            </el-menu-item>
        </el-menu>
        <div class="home-content">
            <header class="home-header">
                <el-dropdown @command="handleEvent" class="profile" :hide-on-click="false">
                    <span class="el-dropdown-link">
                        <i class="lemon avatar">&#xe60c;</i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <!-- <el-dropdown-item command="updatePassword">修改密码</el-dropdown-item> -->
                        <!-- <el-dropdown-item command="address">取货地址</el-dropdown-item> -->
                    </el-dropdown-menu>
                </el-dropdown>
            </header>
            <router-view></router-view>
        </div>
        <!-- <update-password-dialog
            v-if="showUpdatPasswordeDialog"
            :visible="showUpdatPasswordeDialog"
            @onclose="showUpdatPasswordeDialog = false"
        ></update-password-dialog>
        <profile-dialog
            v-if="showCheckProfileDialog"
            :visible="showCheckProfileDialog"
            @onclose="showCheckProfileDialog = false"
        ></profile-dialog> -->
    </div>
</template>
<script>

import { Menu, Submenu, MenuItemGroup, MenuItem, Button, Dropdown, DropdownItem, DropdownMenu } from "element-ui";
// import UpdatePasswordDialog from "./components/update-password-dialog.vue";
// import ProfileDialog from "./components/profile-dialog.vue";

import { mapState } from 'vuex';

// import { getProfile } from '@/services/teacher.js';

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
        // UpdatePasswordDialog,
        // ProfileDialog,
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
            // const level = ['product'];
            // if (this.userInfo) {
            //     return this.$route.name !== level[this.userInfo.loginLevel - 1] ? level[this.userInfo.loginLevel - 1] : this.$route.name;
            // }
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
        async handleEvent(command) {
            // if (command === 'checkProfile') {
            //     let show = true;
            //     if (this.userInfo.loginLevel === 3) {
            //         const res = await getProfile({
            //             jobNumber: this.userInfo.jobNumber,
            //         });
            //         const { code, data, message } = res.data;
            //         if (code === 200) {
            //             this.$store.commit('updateUserInfo', {
            //                 ...data,
            //                 ...data.teacherDetail,
            //             });
            //         }
            //     }
            //     this.showCheckProfileDialog = true;
            // }
            // if (command === 'updatePassword') {
            //     this.showUpdatPasswordeDialog = true;
            // }
        },
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
