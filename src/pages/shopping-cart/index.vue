<template>
    <view class="page-component-container__shopping-cart">
        <template v-if="tableData.length > 0">
			<view class="address-bar d-e-c">
				<view class="f30" @click="isEdit = !isEdit">
					<button v-if="isEdit">完成</button>
					<button v-else>编辑</button>
				</view>
			</view>

			<view class="section">
				<view class="item" v-for="(item, index) in tableData" :key="index">
					<label class="d-c-c" @click="checkItem(item, index)">
						<checkbox value="cb" class="checkbox" :checked="item.checked" />
					</label>
					<image :src="item.product_image" class="cover" mode="aspectFit"></image>
					<view class="info">
						<view class="title">{{ item.product_name }}</view>
						<view class="describe">{{ item.selling_point }}</view>
						<view class="level-box count_choose">
							<view class="price">
								¥
								<text class="num">{{ item.product_price }}</text>
							</view>
							<view class="num-wrap">
								<view class="icon-box minus d-c-c" @click="reduceFunc(item)">
									<span class="icon iconfont icon-jian" :class="item.total_num<=1?'gray':'gray3'"></span>
								</view>
								<view class="text-wrap">
									<input type="number" :maxlength="item.product_sku.stock_num" v-model="item.total_num" />
								</view>
								<view class="icon-box plus d-c-c" @click="addFunc(item)">
									<span class="icon iconfont icon-jia" :class="item.total_num>=item.product_sku.stock_num?'gray':'gray3'"></span>
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
    </view>

</template>

<script>
import { } from '@dcloudio/uni-ui';
	export default {
        components: {
        },
		data() {
			return {
                tableData: [],
			}
		},
		onLoad() {

		},
		methods: {
            gotoShop(){
				uni.switchTab({
				    url: '/pages/home/index'
				});
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
    // bottom: calc(var(--window-bottom);
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

