<template>
    <view class="page-component-container__mine">
        <view class="profile">
            <view class="avatar">
                <image class="mine_avatar" v-show="openId" :src="userInfo.avatarUrl" />
                <image class="mine_none" v-show="!openId" src="@/static/images/mine_avatar.png" />
            </view>
            <view class="name">
                <view  v-show="openId">{{userInfo.nickName}}</view>
                <view  v-show="!openId" @click="login">点击登录</view>
            </view>
            <view class="exit">
                <image  v-show="openId" @click="loginout" src="@/static/images/exit.png" />
            </view>
        </view>
        <view class="my-order">
            <view class="group-hd border-b-e">
                <view class="left"><text class="min-name">我的订单</text></view>
            </view>
            <view class="d-b-c">
                <view class="item" @click="gotoPage('/pages/mine/myorder/myorder?status=all')">
                    <view class="icon-box"><span class="icon iconfont icon-quanbudingdan"></span></view>
                    <text>全部订单</text>
                </view>
                <view class="item" @click="gotoPage('/pages/mine/myorder/myorder?status=unsend')">
                    <view class="icon-box pr">
                        <span class="icon iconfont icon-icon"></span>
                        <text class="dot d-c-c" v-if="orderCount.notShipped != null && orderCount.notShipped > 0">{{ orderCount.notShipped }}</text>
                    </view>
                    <text>待发货</text>
                </view>
                <view class="item" @click="gotoPage('/pages/mine/myorder/myorder?status=sending')">
                    <view class="icon-box pr">
                        <span class="icon iconfont icon-daishouhuo"></span>
                        <text class="dot d-c-c" v-if="orderCount.toBeReceived != null && orderCount.toBeReceived > 0">{{ orderCount.toBeReceived }}</text>
                    </view>
                    <text>待收货</text>
                </view>
                <view class="item" @click="gotoPage('/pages/order/refund/index/index')">
                    <view class="icon-box pr">
                        <span class="icon iconfont icon-tuikuan"></span>
                        <text class="dot d-c-c" v-if="orderCount.refund != null && orderCount.refund > 0">{{ orderCount.refund }}</text>
                    </view>
                    <text>退款/售后</text>
                </view>
            </view>
        </view>
        <!--菜单-->
		<view class="menu-wrap">
			<view class="group-bd">
				<view class="item d-b-c" v-for="(item, index) in menus" :key="index" @click="gotoPage(item.path)">
					<view class="d-s-c type">
						<text :class="'icon iconfont ' + item.icon"></text>
						<text class="name">{{ item.name }}</text>
					</view>
					<view class="right"><text class="icon iconfont icon-jiantou"></text></view>
				</view>
			</view>
		</view>
    </view>
</template>

<script>
	export default {
        components: {
        },
		data() {
			return {
                openId: '',
                userInfo: null,
                menus: [
                    {
                        name: '收货地址',
                        icon: 'icon-dizhi1',
                        path: '/pages/mine/address/index',
                    }
                ],
                orderCount: {},
			}
        },
        computed: {
        },
		onLoad() {
            this.openId = uni.getStorageSync('token');
            this.userInfo = JSON.parse(JSON.stringify(uni.getStorageSync('userInfo')));
            uni.showLoading({
                title: '加载中',
                mask:true
            });
            this.updateData();
        },
        onShow() {
            this.openId = uni.getStorageSync('token');
            this.userInfo = JSON.parse(JSON.stringify(uni.getStorageSync('userInfo')));
        },
		methods: {
            login() {
                uni.navigateTo({
                    url: '/pages/login/login',
                })
            },
            loginout() {
                uni.setStorageSync('token', '');
                uni.setStorageSync('userInfo', null);
                this.openId = '';
                this.userInfo = null;
            },
            updateData() {
                const _self = this;
                _self._get(true, 'user/queryOrderNumbs', {}, function({ data }) {
                    _self.orderCount = data;
                    uni.hideLoading();
                })
            },
            /*跳转页面*/
            gotoPage(path) {
                if (path === '/pages/mine/address/index') {
                    uni.setStorageSync('link-address-type', 'mine');
                }
                uni.navigateTo({
                    url: path
                });
            }
		}
	}
</script>

<style lang="scss">
.profile {
    background-color: #e85953;
    display: flex;
    height: 250rpx;
    padding-left: 75rpx;
    .avatar {
        width: 150rpx;
        height: 150rpx;
        border-radius: 50%;
        background-color: #ece9e9;
        display: flex;
        justify-content: center;
        align-items: center;
        .mine_none {
            width: 75rpx;
            height: 75rpx;
        }
        .mine_avatar {
            height: 100%;
            border-radius: 50%;
        }
        margin-top: 50rpx;
    }
    .name {
        margin-top: 95rpx;
        margin-left: 50rpx;
        color: white;
        font-size: 48rpx;
    }
}
.exit {
    position: absolute;
    right: 12rpx;
    top: 6rpx;
    image {
        width: 50rpx;
        height: 50rpx;
    }
}
.my-order {
    position: absolute;
    padding: 0 30rpx;
    height: 240rpx;
    right: 30rpx;
    top: 220rpx;
    left: 30rpx;
    box-sizing: border-box;
    border-radius: 16rpx;
    box-shadow: 0 0 6rpx 0 rgba(0, 0, 0, 0.1);
    background: #ffffff;
}

.my-order .item {
    display: flex;
    padding: 20rpx 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 26rpx;
}

.my-order .icon-box,
.my-assets .icon-box {
    width: 60rpx;
    height: 60rpx;
}

.my-order .icon-box .iconfont,
.my-assets .icon-box .iconfont {
    font-size: 50rpx;
    color: #333333;
}

.my-order .icon-box .dot {
    position: absolute;
    top: 0;
    left: 30rpx;
    height: 30rpx;
    min-width: 30rpx;
    padding: 4rpx;
    border-radius: 20rpx;
    font-size: 20rpx;
    background: #f00808;
    color: #ffffff;
}

.menu-wrap {
    margin-top: 240rpx;
    margin-right: 30rpx;
    margin-left: 30rpx;
    background: #ffffff;
    border-radius: 16rpx;
    box-shadow: 0 0 8rpx 0 rgba(0, 0, 0, 0.1);
}

.menu-wrap .item {
    padding: 0 30rpx;
    height: 120rpx;
    font-size: 32rpx;
}
.menu-wrap .icon-round {
    width: 40rpx;
    height: 40rpx;
    background: red;
    border-radius: 50%;
}
.menu-wrap .item .type .iconfont {
    font-size: 50rpx;
    color: #e2231a;
}
.menu-wrap .item .name {
    margin-left: 10rpx;
}
.menu-wrap .item .iconfont {
    font-size: 24rpx;
}
</style>
