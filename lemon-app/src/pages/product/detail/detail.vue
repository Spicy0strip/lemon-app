<template>
	<view class="product-detail" v-if="!loadding">
		<view class="product-pic">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item>
                    <image :src="productInfo.imageUrl" mode="aspectFit"></image>
                </swiper-item>
			</swiper>
		</view>
		<!--基本信息-->
		<view class="bg-white">
			<view class="price-wrap">
				<view class="left">
					<template>
						<view class="new-price">
							¥
							<text class="num">{{ productInfo.price }}</text>
						</view>
						<!-- <text class="old-price">¥{{ productInfo.line_price }}</text> -->
					</template>
				</view>
				<template>
					<text class="already-sale">已出售{{ productInfo.sales }}件</text>
				</template>
			</view>
			<view class="product-name">{{ productInfo.name }}</view>
			<view class="product-describe">{{ productInfo.detail }}</view>
		</view>

		<!--详情内容-->
		<view class="product-content">
			<view class="group-hd border-b-e">
				<view class="left"><text class="min-name">商品介绍</text></view>
			</view>
			<view class="content-box" v-html="productInfo.detail"></view>
		</view>

		<!--分享-->
		<view class="share-box">
			<button type="primary" @click="showShare"><text class="icon iconfont icon-share"></text></button>
		</view>

		<!--底部按钮-->
		<view class="btns-wrap">
			<!-- <view class="icon-box d-c-c">
				<button class="icon iconfont icon-kefu2" open-type="contact" session-from="wxapp"></button>
			</view> -->
			<!-- <view class="icon-box d-c-c" @click="openMaservice"><button class="icon iconfont icon-kefu2"></button></view> -->
			<view class="icon-box d-c-c" @click="gotocart">
				<button class="pr icon iconfont icon-gouwuche">
					<text v-if="cart_total_num > 0" class="num">{{ cart_total_num }}</text>
				</button>
			</view>
			<template>
				<button type="primary" class="add-cart" @click="openPopup('cart')">加入购物车</button>
				<button type="primary" class="buy" @click="openPopup('order')">立即购买</button>
			</template>
		</view>

		<spec :isPopup="isPopup" :productModel="productModel" @close="closePopup"></spec>

		<!--底部弹窗-->
		<!-- <share :isbottmpanel="isbottmpanel" :product_id="product_id" @close="closeBottmpanel"></share> -->

	</view>
</template>

<script>
import spec from './popup/spec.vue';
export default {
	components: {
		spec
	},
	data() {
		return {
            loadding: true,
            productInfo: null,
            productId: null,
            isPopup: false,
            productModel: {
                detail: null,
                type: '',
            }
		};
	},
	onLoad(e) {
		uni.showLoading({
			title: '加载中',
			mask: true
		});
        this.productId = e.productId ? e.productId : '';
	},
	async mounted() {
		await this.updateData();
	},
	methods: {
		updateData() {
			let _self = this;
			_self._get(
                true,
				'user/cargoDetail',
				{
					cargoId: _self.productId,
				},
				function({ data }) {
                    _self.productInfo = data;
					_self.loadding = false;
					uni.hideLoading();
				}
			);
		},

		openPopup(e) {
			let self = this;
			self.isPopup = true;
			self.productModel.detail = self.productInfo;
			self.productModel.type = e;
		},

		/*关闭弹窗*/
		closePopup() {
			let self = this;
			self.isPopup = false;
			self.updateData();
        },

		/*跳转购物车*/
		gotocart() {
			uni.switchTab({
				url: '/pages/shopping-cart/index',
			});
		},
	}
};
</script>

<style lang="scss">
.product-detail {
    padding-bottom: 90rpx;
}

.product-detail .product-pic,
.product-detail .product-pic .swiper,
.product-detail .product-pic image {
    width: 750rpx;
    height: 750rpx;
}

.product-detail .price-wrap {
    padding: 20rpx 20rpx 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.product-detail .price-wrap .left {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
}

.product-detail .price-wrap .new-price {
    color: $dominant-color;
    font-size: 30rpx;
    font-weight: bold;
}

.product-detail .price-wrap .new-price .num {
    padding: 0 4rpx;
    font-size: 50rpx;
}

.product-detail .price-wrap .old-price {
    margin-left: 10rpx;
    font-size: 30rpx;
    color: #999999;
    text-decoration: line-through;
}

.product-detail .already-sale {
    font-size: 24rpx;
    color: #999999;
}

.product-detail .product-name {
    padding: 4rpx 20rpx 0;
    font-size: 30rpx;
    font-weight: bold;
    color: #333333;
}

.product-detail .product-describe {
    padding: 20rpx;
    line-height: 40rpx;
    font-size: 24rpx;
    color: red;
}

.product-comment,
.product-content {
    margin-top: 20rpx;
    background: #ffffff;
}

.product-content .content-box p image {
    width: 100%;
}

.product-content .content-box {
    font-size: 36rpx;
}

.btns-wrap {
    position: fixed;
    height: 90rpx;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    background: #ffffff;
}

.btns-wrap .icon-box {
    width: 90rpx;
    height: 90rpx;
    border-right: 1px solid #dddddd;
}

.btns-wrap .icon-box .iconfont {
    font-size: 40rpx;
    color: #888888;
}

.btns-wrap .icon-box .iconfont .num {
    position: absolute;
    width: 30rpx;
    top: 10rpx;
    left: 50%;
    height: 30rpx;
    line-height: 30rpx;
    border-radius: 15rpx;
    font-size: 20rpx;
    color: #ffffff;
    background: red;
}

.btns-wrap button,
.btns-wrap button:after {
    height: 91rpx;
    line-height: 90rpx;
    margin: 0;
    padding: 0;
    flex: 1;
    border-radius: 0;
    border: 0;
}

.btns-wrap button.add-cart {
    background: $orange-color;
}

.btns-wrap button.buy {
    background: $dominant-color;
}

.share-box {
    position: fixed;
    padding-right: 10rpx;
    width: 80rpx;
    height: 80rpx;
    right: 0;
    bottom: 180rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16rpx 0 0 16rpx;
    background: rgba(0, 0, 0, 0.8);
}

.share-box button {
    padding: 0;
    background: 0;
    line-height: 60rpx;
}

.share-box .iconfont {
    margin-bottom: 10rpx;
    font-size: 50rpx;
    color: #ffffff;
}

.create-img {
    width: 100%;
    padding: 20rpx;
    box-sizing: border-box;
}

.create-img image {
    width: 100%;
}

.create-img button {
    width: 100%;
}
</style>
