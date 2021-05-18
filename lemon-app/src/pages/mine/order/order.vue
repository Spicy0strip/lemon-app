<template>
	<view class="wrap" v-if="loading">
		<shop-info :addresses="addresses" :defaultAddress="defaultAddress" :myInfo="myInfo"></shop-info>
		<!--购买的产品-->
		<view class="vender">
			<view class="group-hd">
				<view class="left"><text class="min-name">商品</text></view>
			</view>
			<view class="list">
				<view class="item" v-for="(item, index) in productData" :key="index">
					<view class="cover">
						<image :src="item.imageUrl" mode="aspectFit"></image>
					</view>
					<view class="info">
						<view class="title">{{ item.name }}</view>
						<view class="describe">{{ item.detail }}</view>

						<view class="level-box count_choose">
							<view class="price">
								¥
								<text class="num">{{ item.price }}</text>
							</view>
							<view class="num-wrap">
								<view class="f22">×{{ item.numbs }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!--总数-->
			<view class="total-box">
				<text>共{{ orderData.orderNums }}件商品，</text>
				<view class="">
					合计：
					<text class="price">￥{{ orderData.orderPrices }}</text>
				</view>
			</view>
		</view>

		<!--支付方式-->
		<view class="buy-checkout">
			<view class="item active">
				<view class="d-s-c">
					<view class="icon-box d-c-c mr10"><span class="icon iconfont icon-weixin"></span></view>
					<text class="key">微信支付：</text>
				</view>
				<view class="icon-box d-c-c"><span class="icon iconfont icon-xuanze"></span></view>
			</view>
		</view>

		<!--买家留言-->
		<!-- <view class="buyer-message uni-textarea"><textarea class="textarea" :remark="remark" placeholder-style="color:#cccccc;" placeholder="选项:买家留言" /></view> -->

		<!--底部支付-->
		<view class="foot-pay-btns">
			<view class="price">
				¥
				<text class="num">{{ orderData.orderPrices }}</text>
			</view>
			<button type="primary" @click="submitOrder">提交订单</button>
		</view>
	</view>
</template>

<script>
import ShopInfo from '../components/shop-info.vue';
import { pay } from '@/common/pay.js';
export default {
	components: {
		ShopInfo,
	},
	data() {
		return {
            loading: false,
            query: null,
			/*商品数据*/
            productData: [],
            orderData: {
                orderNums: 0,
                orderPrices: 0,
            },
            addresses: [],
            defaultAddress: '',
            myInfo: {
                name: '',
                phone: '',
            }
		};
	},
	async onLoad(query) {
        this.query = query;
        console.log('onLoad');
        this.updateData();
        this.updateAddress(); 
        const myInfo = JSON.parse(uni.getStorageSync('my-info-address'));
        this.myInfo = myInfo ? myInfo : { name: '', phone: '' };  
    },
    onShow() {
        console.log('onShw');
    },
	async created() {
        this.updateData();
	},
	methods: {
        updateData() {
            const data = JSON.parse(uni.getStorageSync('confirm-order'));
            console.log('confirm-order', data);
            this.productData = data ? data : [];
            this.productData.forEach(item => {
                this.orderData.orderNums += item.numbs;
                this.orderData.orderPrices += item.price * item.numbs;
            });
            this.loading = true;
        },
        updateSelectAddress() {
            const res = uni.getStorageSync('select-address');
            console.log('res::', uni.getStorageSync('select-address'));
            this.defaultAddress = res ? res : this.addresses.length ? this.addresses[0] : '';
        },
		/*提交订单*/
		submitOrder() {
            let _self = this;
            if (!_self.myInfo.name || !_self.myInfo.phone) {
                uni.showToast({
                    title: '联系人或手机号未输入',
                    duration: 2000
                });
                return;
            }
            uni.showLoading({
				title: '加载中',
				mask:true
            });
            const body = {
                address: _self.defaultAddress,
                type: _self.query.orderType === 'gwc' ? 'gwc' : '',
                cargoIds: _self.query.productId ? _self.query.productId : self.productData.map(item => item.id).join(','),
                cargoNumbs: _self.query.productNum ? _self.query.productNum : self.productData.map(item => item.numbs).join(','),
                name: _self.myInfo.name,
                phone: _self.myInfo.phone,
            };
            _self._post(true, 'user/generateOrder', body, function({ data, code, message }) {
                if (code === 200) {
                    uni.showToast({
                        title: '下单成功',
                        duration: 2000
                    });
                    uni.navigateTo({
                        url: "/pages/mine/myorder/myorder?status=unsend",
                    });
                }
                console.log(data, code, message);
                uni.hideLoading();
            });
        },
        updateAddress() {
            const _self = this;
            _self._get(true, 'queryAddress', {}, function({ data }) {
                _self.addresses = data ? data : [];
                _self.updateSelectAddress();
            });
        }
	}
};
</script>

<style lang="scss">
.wrap {
    padding-bottom: 90rpx;
}
.vender .list .cover image {
    width: 200rpx;
    height: 200rpx;
}
</style>
