<template>
    <view class="page-component-container__shopping-cart">
        <template v-if="carts.length > 0">
			<view class="address-bar d-e-c">
				<view class="f30" @click="isEdit = !isEdit">
					<button v-if="isEdit">完成</button>
					<button v-else>编辑</button>
				</view>
			</view>

			<view class="section">
				<view class="item" v-for="(item, index) in carts" :key="index">
					<label class="d-c-c" @click="checkItem(item, index)">
						<checkbox value="cb" class="checkbox" :checked="item.checked" />
					</label>
					<image :src="item.imageUrl" class="cover" mode="aspectFit"></image>
					<view class="info">
						<view class="title">{{ item.name }}</view>
						<view class="describe">{{ item.detail }}</view>
						<view class="level-box count_choose">
							<view class="price">
								¥
								<text class="num">{{ item.price }}</text>
							</view>
							<view class="num-wrap">
								<view class="icon-box minus d-c-c" @click="reduceFunc(item)">
									<span class="icon iconfont icon-jian" :class="item.stock / item.weight<=item.numbs?'gray':'gray3'"></span>
								</view>
								<view class="text-wrap">
									<input type="number" :maxlength="item.stock / item.weight" v-model="item.numbs" />
								</view>
								<view class="icon-box plus d-c-c" @click="addFunc(item)">
									<span class="icon iconfont icon-jia" :class="item.stock / item.weight < item.numbs?'gray':'gray3'"></span>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>
        <template v-else>
            <view class="none-data-box">
                <image src="/static/none.png" mode="widthFix"></image>
                <text>购物车空空如也</text>
                <button type="default" class="btn-red mt30 ww100" @click="gotoShop">去购物</button>
            </view>
        </template>
        <view class="bottom-btns f28" v-if="carts.length > 0">
            <label class="d-c-c mr20" @click="onCheckedAll()">
                <checkbox class="checkbox" :checked="checkedAll" value="cb" />
                全选
            </label>
            <view class="d-e-c" v-if="!isEdit">
                <view class="total d-s-c flex-1 mr20">
                    <text>合计：</text>
                    <view class="price f22">
                        ¥
                        <text class="num f40">{{ totalPrice }}</text>
                    </view>
                </view>
                <button type="primary" class="buy-btn" @click="submit()">去结算</button>
            </view>
            <view class="" v-else><button type="primary" @click="onDelete()" class="delete-btn mr20">删除</button></view>
        </view>
    </view>
    <!--底部按钮-->
</template>

<script>
import { } from '@dcloudio/uni-ui';
	export default {
        components: {
        },
		data() {
			return {
                pagenation: {
                    total: 0,
                    pageNum: 1,
                    pageSize: 10,
                },
                carts: [],
                isEdit: false,
                // 是否全选
                checkedAll: false,
                totalPrice: 0,
			}
        },
        computed: {
            query() {
                return {
                    pageNum: this.pagenation.pageNum,
                };
            }
        },
		onLoad() {
            this.updateData();
        },
        created () {
        },
		methods: {
            updateData() {
                const _self = this;
                _self._get(true, '/user/queryCart', _self.query, function({ data }) {
                    _self.carts = data.list ? data.list : [];
                    _self.pagenation = {
                        total: data.total,
                        pageNum: data.pageNum,
                        pageSize: data.pageSize,
                    };
                    _self._initGoodsChecked();
                });
            },
            reduceFunc(item) {
                const _self = this;
                _self.get(true, '/user/decrby', {
                    cargoId: item.id,
                }, function({ data, code, message }) {
                    // if (code === 200) {
                        
                    // }
                });
            },
            addFunc(item) {
                const _self = this;
                _self.get(true, '/user/incrby', {
                    cargoId: item.id,
                }, function({ data, code, message }) {
                    // if (code === 200) {
                        
                    // }
                });
            },
            /*单选*/
            checkItem(e, index) {
                e.checked = !e.checked;
                this.$set(this.carts, index, e);

                // 更新选中记录
                this.onUpdateChecked();
                // 更新购物车已选商品总价格
                this.updateTotalPrice();
                // 更新全选状态
                this.checkedAll = this.getCheckedCarts().length == this.carts.length;
            },
            /**
             * 更新商品选中记录
             */
            onUpdateChecked() {
                let self = this,
                checkedCarts = [];
                self.carts.forEach(item => {
                    if (item.checked == true) {
                        checkedCarts.push(`${item.id}`);
                    }
                });
                uni.setStorageSync('checkedCarts', JSON.stringify(checkedCarts));
            },
             /**
             * 初始化商品选中状态
             */
            _initGoodsChecked() {
                let self = this;
                let checkedCarts = self.getCheckedCarts();
                // 将商品设置选中
                self.carts.forEach(item => {
                    item.checked = checkedCarts.some(item1 => item.id === item1.id);
                });
                self.isEdit = false;
                self.checkedAll = checkedCarts.length == self.carts.length;
                // 更新购物车已选商品总价格
                self.updateTotalPrice();
            },
            updateTotalPrice() {
                let total_price = 0;
                let items = this.carts;
                for (let i = 0; i < items.length; i++) {
                    if (items[i]['checked'] == true) {
                        total_price += items[i]['numbs'] * items[i]['price'];
                    }
                }
				/*保留2位小数*/
                this.totalPrice = total_price.toFixed(2);
            },
            /*全选*/
            onCheckedAll() {
                let self = this;
                self.checkedAll = !self.checkedAll;
                self.carts.forEach(item => {
                    item.checked = self.checkedAll;
                });
                self.updateTotalPrice();
                // 更新选中记录
                self.onUpdateChecked();
            },
            /**
             * 获取选中的商品
             */
            getCheckedCarts() {
                let checkedCarts = JSON.parse(uni.getStorageSync('checkedCarts'));
                return checkedCarts ? checkedCarts : [];
            },
            gotoShop(){
				uni.switchTab({
				    url: '/pages/home/index'
				});
            },
            submit() {
                let res = this.carts;
                if (!this.checkedAll) {
                    const cartIds = this.getCheckedCarts();
                    res = this.carts.filter(item => cartIds.includes(String(item.id)));
                }
                uni.setStorageSync('confirm-order', JSON.stringify(res));
                const productId = res.map(item => item.id).join(',');
                const productNum = res.map(item => item.numbs).join(',');
				uni.navigateTo({
					url: `/pages/mine/order/order?productId=${productId}&productNum=${productNum}&orderType=gwc`,
				});
            },
            onDelete() {
                const _self = this;
                if (this.checkedAll) {
                    _self._get(true, 'user/deleteAllCart', {}, function({ data }) {
                        uni.showToast({
                            title: '全部删除成功',
                            icon: 'none',
                            duration: 2000
                        });
                        _self.updateData();
                    })
                } else {
                    _self._get(true, 'user/deleteCart', {
                        cargoId: _self.getCheckedCarts().map(item => Number(item)).join(','),
                    }, function({ data, code, message }) {
                        uni.showToast({
                            title: '删除成功',
                            duration: 2000
                        });
                        _self.updateData();
                    });
                }
            }
		}
	}
</script>

<style lang="scss">
.card {
    padding-bottom: 100rpx;
}

.card .checkbox {
    transform: scale(0.7);
}

.address-bar {
    padding: 20rpx;
}

.address-bar button {
    border: 1rpx solid $dominant-color;
    background: #ffffff;
    color: $dominant-color;
}

.section {
    background: #ffffff;
}

.section .item {
    padding: 20rpx;
    display: flex;
    border-bottom: 1px solid #eeeeee;
}

.section .cover {
    width: 200rpx;
    height: 200rpx;
}

.section .info {
    flex: 1;
    padding-left: 20rpx;
    box-sizing: border-box;
    overflow: hidden;
}
.section .title {
    font-size: 34rpx;
}
.section .title,
.vender .list .describe {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.section .describe {
    margin-top: 20rpx;
    font-size: 24rpx;
    color: #999999;
}

.section .price {
    color: $dominant-color;
    font-size: 24rpx;
}

.section .price .num {
    padding: 0 4rpx;
    font-size: 40rpx;
}

.section .level-box {
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.section .level-box .key {
    font-size: 24rpx;
    color: #999999;
}

.section .level-box .num-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.section .level-box .icon-box {
    width: 60rpx;
    height: 60rpx;
    border: 1px solid #dddddd;
    background: #f7f7f7;
}

.section .level-box .icon-box .gray {
    color: #cccccc;
}

.section .level-box .icon-box .gray3 {
    color: #333333;
}

.section .level-box .text-wrap {
    margin: 0 4rpx;
    height: 60rpx;
    border: 1px solid #dddddd;
    background: #f7f7f7;
}

.section .level-box .text-wrap input {
    padding: 0 10rpx;
    height: 60rpx;
    line-height: 60rpx;
    width: 80rpx;
    font-size: 24rpx;
    text-align: center;
}

.bottom-btns {
    position: fixed;
    padding: 0 0 0 20rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90rpx;
    right: 0;
    bottom: calc(var(--window-bottom));
    left: 0;
    box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    z-index: 99;
}

.bottom-btns .delete-btn {
    margin: 0;
    padding: 0 30rpx;
    height: 70rpx;
    line-height: 70rpx;
    border-radius: 35rpx;
    background-color: $dominant-color;
    font-size: 30rpx;
}

.bottom-btns .buy-btn {
    margin: 0;
    padding: 0 60rpx;
    height: 90rpx;
    line-height: 90rpx;
    border-radius: 0;
    background-color: $dominant-color;
    font-size: 30rpx;
}

.bottom-btns .price {
    color: $dominant-color;
}
</style>

