<template>
	<view v-if="loading">
		<view class="address-list bg-white">
			<view class="address p30 d-s-c border-b-e" v-for="(item,index) in addresses" :key="index">
				<view class="radio" v-if="linkType === 'order'">
					<radio :value="index" :checked="checkedAddress === item" @click="radioChange(item)" />
				</view>
				<view class="info flex-1 ml20">
					<!-- <view class="user f34">
						<text>{{item.name}}</text>
						<text class="ml20">{{item.phone}}</text>
					</view> -->
					<view class="pt10 f28 gray6">
						<!-- <text class="tag" v-if="checkedAddress === item">默认</text> -->
                        {{item}}
					</view>
				</view>
			</view>
		</view>
        <view class="foot-btns">
			<button type="primary" class="btn-red" @click="selectAddress">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                loading: false,
                checkedAddress: '',
                addresses: [],
                linkType: 'order'
			}
        },
        props: {
        },
        onLoad(e) {
            uni.showLoading({
                title: '加载中',
                mask: true
            });
            this.linkType = uni.getStorageSync('link-address-type') ? uni.getStorageSync('link-address-type') : 'order';
        },
        created() {
            this.updateAddress();
        },
		methods: {
            radioChange(num) {
                this.checkedAddress = num;
            },
            updateAddress() {
                const _self = this;
                console.log('user')
                _self._get(true, 'queryAddress', {}, function({ data }) {
                    _self.addresses = data ? data : [];
                    _self.updateSelectAddress();
                    _self.loading = true;
                });
            },
            selectAddress() {
                uni.setStorageSync('select-address', this.checkedAddress);
                uni.showToast({
                    title: '选中提货地址',
                    duration: 2000
                });
                uni.navigateTo({
					url: "/pages/mine/order/order",
				});
            },
            updateSelectAddress() {
                const res = uni.getStorageSync('select-address');
                this.checkedAddress = res ? res : this.addresses.length ? this.addresses[0] : '';
            },
			/*跳转页面*/
			gotoPage(path) {
				uni.navigateTo({
					url: path
				});
			},
		}
	}
</script>

<style>
.address-list {
    padding-bottom: 90rpx;
}

.foot-btns {
    padding: 0;
}

.foot-btns .btn-red {
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    border-radius: 0;
}
</style>
