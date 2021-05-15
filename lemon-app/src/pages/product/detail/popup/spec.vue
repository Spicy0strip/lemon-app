<template>
	<view :class="Visible?'product-popup open':'product-popup close'" @touchmove.stop.prevent="" @click="closePopup">
		<view class="popup-bg"></view>
		<view class="main" v-on:click.stop>
			<view class="header">
				<image :src="form.detail.imageUrl" mode="aspectFit" class="avt"></image>
				<view class="price">
					¥
					<text class="num">{{form.detail.price}}</text>
				</view>
				<view class="stock">
					库存：{{form.detail.stock}}
				</view>
				<view class="close-btn" @click="closePopup">
					<text class="icon iconfont icon-guanbi"></text>
				</view>
			</view>

			<view class="body">
				<view class="level-box count_choose">
					<text class="key">数量</text>
					<view :class="form.detail.stock / form.detail.weight>0?'num-wrap':'num-wrap no-stock'">
						<view class="icon-box minus d-c-c" @click="sub()">
							<text class="icon iconfont icon-jian"></text>
						</view>
						<view class="text-wrap">
							<input type="text" v-model="sum" value="" />
						</view>
						<view class="icon-box plus d-c-c" @click="add()">
							<text class="icon iconfont icon-jia"></text>
						</view>
					</view>
				</view>
			</view>
			<view class="btns">
				<button type="primary" class="confirm-btn" @click="confirmFunc(form)">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/*是否可见*/
				Visible: false,
				sum: 1,
				form: null,
			}

		},
		props: ['isPopup', 'productModel'],
		onLoad() {

		},
		mounted() {

		},
		watch: {
			'isPopup': function(n, o) {
				if (n != o) {
					this.Visible = n;
					this.form = this.productModel;
				}
			}
		},
		methods: {
			/*关闭弹窗*/
			closePopup() {
				this.$emit('close');
			},

			confirmFunc() {
				if (this.form.type == 'cart') {
					this.addCart();
				} else {
					this.createdOrder();
				}
			},

			/*加入购物车*/
			addCart() {
                let _self = this;
                _self._post(true, 'user/addCart', {
                    cargoIds: `${_self.form.detail.id}`,
                    cargoNumbs: `${_self.sum}`,
                }, function({ data, code, message }) {
                    if (code === 200) {
                        _self.closePopup();
                        uni.showToast({
                            title: message,
                            duration: 2000
                        });
                    }
                });
			},

			/*创建订单*/
			createdOrder() {
                const res = [{
                    ...this.form.detail,
                    numbs: this.sum,
                    type: 'buy',
                }];
                uni.setStorageSync('confirm-order', JSON.stringify(res));
				uni.navigateTo({
					url: `/pages/mine/order/order?productId=${this.form.detail.id}&productNum=${this.sum}&orderType=buy`,
				});
			},
			/*商品增加*/
			add() {
                const nums = this.form.detail.stock / this.form.detail.weight;
				let a = this.sum;
				if (a >= nums) {
					uni.showToast({
						title: '数量超过了库存',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				a++;
				this.sum = a;
			},
			/*商品减少*/
			sub() {
				const nums = this.form.detail.stock / this.form.detail.weight;
				let a = this.sum;
				if (a < 2) {
					uni.showToast({
						title: '商品数量至少为1',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				a--;
				this.sum = a;
			}

		}
	}
</script>

<style lang="scss">
.product-popup {
}

.product-popup .popup-bg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 99;
}

.product-popup .main {
    position: fixed;
    width: 100%;
    bottom: 0;
    min-height: 200rpx;
    max-height: 900rpx;
    background-color: #fff;
    transform: translate3d(0, 980rpx, 0);
    transition: transform 0.2s cubic-bezier(0, 0, 0.25, 1);
    bottom: env(safe-area-inset-bottom);
    z-index: 99;
}

.product-popup.open .main {
    transform: translate3d(0, 0, 0);
}

.product-popup.close .popup-bg {
    display: none;
}

.product-popup .header {
    height: 120rpx;
    padding: 10rpx 0 10rpx 250rpx;
    position: relative;
    border-bottom: 1px solid #eeeeee;
}

.product-popup .header .avt {
    position: absolute;
    top: -80rpx;
    left: 30rpx;
    width: 200rpx;
    height: 200rpx;
    border: 2px solid #ffffff;
    background: #ffffff;
}

.product-popup .header .stock {
    font-size: 24rpx;
    color: #999999;
}

.product-popup .close-btn {
    position: absolute;
    width: 40rpx;
    height: 40rpx;
    top: 10rpx;
    right: 10rpx;
}

.product-popup .price {
    color: $dominant-color;
    font-size: 30rpx;
}

.product-popup .price .num {
    padding: 0 4rpx;
    font-size: 50rpx;
}

.product-popup .old-price {
    margin-left: 10rpx;
    font-size: 30rpx;
    color: #999999;
    text-decoration: line-through;
}

.product-popup .body {
    padding: 20rpx 30rpx;
    max-height: 600rpx;
    overflow-y: auto;
}

.product-popup .level-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.product-popup .level-box .key {
    font-size: 24rpx;
    color: #999999;
}

.product-popup .level-box .num-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.product-popup .level-box .icon-box {
    width: 60rpx;
    height: 60rpx;
    border: 1px solid #dddddd;
    background: #f7f7f7;
}

.product-popup .num-wrap .iconfont {
    color: #666;
}

.product-popup .num-wrap.no-stock .iconfont {
    color: #cccccc;
}

.product-popup .level-box .text-wrap {
    margin: 0 4rpx;
    height: 60rpx;
    border: 1px solid #dddddd;
    background: #f7f7f7;
}

.product-popup .level-box .text-wrap input {
    padding: 0 10rpx;
    height: 60rpx;
    line-height: 60rpx;
    width: 80rpx;
    text-align: center;
}

.specs .specs-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
}

.specs .specs-list button {
    margin-right: 10rpx;
    margin-bottom: 10rpx;
    font-size: 24rpx;
}

.specs .specs-list button:after,
.product-popup .btns button,
.product-popup .btns button:after {
    border: 0;
    border-radius: 0;
}

.product-popup .btns .confirm-btn {
    height: 90rpx;
    line-height: 90rpx;
    background: $dominant-color;
}
</style>
