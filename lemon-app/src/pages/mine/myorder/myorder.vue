<template>
	<view>
		<view class="top-tabbar">
			<view :class="status === 'all'?'tab-item active':'tab-item'" @click="stateFunc('all')">
				全部订单
			</view>
			<!-- <view :class="state_active==1?'tab-item active':'tab-item'" @click="stateFunc('')">
				待付款
			</view> -->
			<view :class="status === 'unsend' ? 'tab-item active':'tab-item'" @click="stateFunc('unsend')">
				待发货
			</view>
			<view :class="status === 'sending' ? 'tab-item active':'tab-item'" @click="stateFunc('sending')">
				待收货
			</view>
		</view>

		<!--列表-->
		<scroll-view scroll-y="true" class="scroll-Y" :style="'height:' + scrollviewHigh + 'px;'" lower-threshold="50"
		 @scrolltolower="scrolltolowerFunc">
			<view :class="topRefresh?'top-refresh open':'top-refresh'">
				<view class="circle" v-for="(circle,n) in 3" :key="n"></view>
			</view>
			<view class="order-list">
				<view class="item" v-for="(item, index) in cargoDatas" :key="index">
					<view class="order-head d-b-c">
						<view>
							<text class="state-text">普通订单</text>
							<text class="shop-name flex-1 fb">订单号：{{item.order.orderId}}</text>
						</view>
						<view class="state">
							<text class="red">{{item.order.status}}</text>
						</view>
					</view>
					<!--多个商品显示-->
					<view class="product-list pr" v-if="item.cargoList.length>1" @click="gotoPage(item.order_id)">
						<scroll-view scroll-x="true">
							<view class="list d-s-c pr100">
								<view class="cover mr10" v-for="(cargo, num) in item.cargoList" :key="num">
									<image :src="cargo.imageUrl" mode="aspectFit"></image>
								</view>
							</view>
						</scroll-view>
						<view class="total-count">
							<view class="left-shadow"></view>
							<view class="price f22">
								¥<text class="f40">{{item.order.totalPrice}}</text>
							</view>
							<view class="count">
								共{{item.order.numbs}}件
							</view>
						</view>
					</view>
					<!--一个商品显示-->
					<view class="one-product d-s-c" v-else @click="gotoPage(item.order_id)">
						<view class="cover" v-for="(cargo, num) in item.cargoList" :key="num">
							<image :src="cargo.imageUrl" mode="aspectFit"></image>
						</view>
						<view class="pro-info flex-1">
							{{item.cargoList[0].name}}
						</view>
						<view class="total-count">
							<view class="left-shadow"></view>
							<view class="price f22">
								¥<text class="f40">{{item.order.totalPrice}}</text>
							</view>
							<view class="count">
								共{{item.order.numbs}}件
							</view>
						</view>
					</view>
					<view class="order-bts">
						<block>
							<!-- 未支付取消订单 -->
							<!-- <button @click="cancelOrder(item.order_id)" type="default" v-if="item.pay_status.value==10">取消</button> -->
							<!-- 已支付取消订单 -->
							<block v-if="item.order.status=='待发货'|| item.order.status=='已发货'">
                                <button v-if="item.order.status=='待发货'" @click="cancelOrder(item.order.id, 'cancel')" type="default">取消订单</button>
								<button v-if="item.order.status=='已发货'" @click="cancelOrder(item.order.id, 'exit')" type="default">申请退货</button>
							</block>
							<text v-if="item.order.status=='退货中'" class="count">退货中</text>
							<!-- 订单付款 -->
							<!-- <block v-if="item.pay_status.value==10">
								<button class="btn-red" @click="payTypeFunc(20,item.order_id)">付款</button>
							</block> -->
							<!-- 确认收货 -->
							<block v-if="item.order.status=='待收货'">
								<button @click="orderReceipt(item.order.id)">确认收货</button>
							</block>
							<!-- 订单评价 -->
							<!-- <button type="default" v-if="item.order_status.value==30 && item.is_comment==0" @click="gotoEvaluate(item.order_id)">评价</button> -->
						</block>

					</view>
				</view>
				<view class="d-c-c p30" v-if="cargoDatas.length==0 && !loading">
					<text class="iconfont icon-wushuju"></text>
					<text class="cont">亲，暂无相关记录哦</text>
				</view>
				<uni-load-more v-else :loadingType="loadingType"></uni-load-more>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	// import Popup from '@/components/uni-popup.vue'
    import uniLoadMore from "@/components/uni-load-more.vue"
	// import {pay} from '@/common/pay.js'
	export default {
		components: {
			// Popup,
            uniLoadMore
		},
		data() {
			return {
				/*手机高度*/
				phoneHeight: 0,
				/*可滚动视图区域高度*/
				scrollviewHigh: 0,
				/*状态选中*/
                status: '',
                cargoDatas: [],
                pagenation: {
                    total: 0,
                    pageNum: 1,
                    pageSize: 10,
                },
				/*顶部刷新*/
				topRefresh: false,
				dataType: 'all',
				/*是否显示支付类别弹窗*/
				isPayPopup: false,
				/*支付方式*/
				pay_type: 20,
				/*订单id*/
				order_id: 0,
				no_more: false,
				loading: true,
				/*是否显示核销二维码*/
				isCodeImg: false,
				codeImg: ''
			}
		},
        computed:{
			/*加载中状态*/
            loadingType(){
                if(this.loading){
                    return 1;
                }else{
                    if(this.cargoDatas.length!=0&&this.no_more){
                        return 2;
                    }else{
                        return 0;
                    }
                }
            },
            query() {
                const statusMap = {
                    'unsend': '待发货',
                    'sending': '已发货',
                    'all': '',
                }
                console.log(statusMap, this.status);
                return {
                    pageNum: this.pagenation.pageNum,
                    status: statusMap[this.status],
                }
            }
        },
		onLoad(e) {
            this.status = e.status;
		},
		mounted() {
			this.init();
            /*获取订单列表*/
            uni.showLoading({
                title: '加载中',
                mask:true
            });
			this.updateData();
		},
		methods: {
			/*初始化*/
			init() {
				let self = this;
				uni.getSystemInfo({
					success(res) {
						self.phoneHeight = res.windowHeight;
						// 计算组件的高度
						let view = uni.createSelectorQuery().select('.top-tabbar');
						view.boundingClientRect(data => {
							let h = self.phoneHeight - data.height;
							self.scrollviewHigh = h;
						}).exec();
					}
				});
			},
			/*状态切换*/
			stateFunc(status) {
                this.status = status;
                uni.showLoading({
					title: '加载中',
					mask:true
				});
				this.updateData();
			},
			/*获取数据*/
			updateData() {
				let self = this;
                self.loading = true;
                self._get(true, 'queryOrders', this.query, function({ data }) {
                    const { list, pageNum, pageSize, total } = data;
                    self.cargoDatas = list;
                    self.pagenation = {
                        total,
                        pageNum,
                        pageSize,
                    }
                    self.loading = false;
                    uni.hideLoading();
                });
			},
			/*跳转页面*/
			gotoPage(e) {
				uni.navigateTo({
					url: '/pages/order/order-detail/order-detail?order_id=' + e,
				});
			},

			/*去支付*/
			payTypeFunc(payType,orderId) {
				let self = this;
				self.isPayPopup = false;
				let pay_source = 'wx';
				// #ifdef  H5
				pay_source = 'mp';
				// #endif
				uni.showLoading({
					title: '加载中',
					mask:true
				});
				self._post('user.order/pay', {
					payType: payType,
					order_id: orderId,
					pay_source: pay_source
				}, function(res) {
					pay(res, self);
				});
			},


			/*确认收货*/
			orderReceipt(id) {
				let self = this;
				wx.showModal({
					title: "提示",
					content: "您确定要收货吗?",
					success: function(o) {
						uni.showLoading({
							title: '正在处理',
							mask:true
						});
						o.confirm && self._get(true, 'user/back', {
							id,
						}, function({ data }) {
							uni.hideLoading();
							uni.showToast({
								title: '收获成功',
								duration: 2000,
								icon: 'success'
							});
							self.cargoDatas = [];
							self.updateData();
						});
					}
				});

			},

			/*取消订单*/
			cancelOrder(id, type) {
				let self = this;
				wx.showModal({
					title: "提示",
					content: `您确定要${type === 'cancel' ? '取消订单' : '申请退款'}吗?`,
					success: function(o) {
						uni.showLoading({
							title: '正在处理',
							mask:true
						});
						o.confirm && self._get(true, type === 'cancel' ? 'user/cancel' : 'user/back', {
							id,
						}, function({ data }) {
							uni.hideLoading();
							uni.showToast({
								title: `${type === 'cancel' ? '取消订单' : '申请退款'}成功`,
								duration: 2000,
								icon: 'success'
							});
							self.cargoDatas = [];
							self.updateData();
						});
					}
				});

			},

			/*去评论*/
			gotoEvaluate(e) {
				uni.navigateTo({
					url: '/pages/order/evaluate/evaluate?order_id=' + e,
				});
			},

			/*可滚动视图区域到底触发*/
			scrolltolowerFunc() {
				let self = this;
				if(self.no_more){return;}
				self.page++;
				if (self.page <= self.last_page) {
					self.updateData();
				}else{
					self.no_more = true;
				}
			}
		
		}
	}
</script>

<style lang="scss">
.order-list .order-head .state-text {
    padding: 4rpx 8rpx;
    margin-right: 10rpx;
    border-radius: 4rpx;
    background: #e2231a;
    color: #ffffff;
}

.order-list .item {
    margin-top: 30rpx;
    padding: 30rpx;
    background: #ffffff;
}

.order-list .product-list,
.order-list .one-product {
    padding: 20rpx 0;
    height: 160rpx;
}

.one-product .pro-info {
    padding: 0 30rpx;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 28rpx;
    color: #666666;
}

.order-list .cover,
.order-list .cover image {
    width: 160rpx;
    height: 160rpx;
}

.order-list .total-count {
    padding-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
}

.total-count .count {
    padding-top: 10rpx;
    color: #666;
    font-size: 28rpx;
}

.product-list .total-count {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
}

.product-list .total-count .left-shadow {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -24rpx;
    width: 24rpx;
    overflow: hidden;
}

.product-list .total-count .left-shadow::after {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 24rpx;
    right: -12rpx;
    display: block;
    content: "";
    background-image: radial-gradient(
        rgba(0, 0, 0, 0.2) 10%,
        rgba(0, 0, 0, 0.1) 40%,
        rgba(0, 0, 0, 0) 80%
    );
}

.order-list .order-bts {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.order-list .order-bts button {
    margin: 0;
    padding: 0 30rpx;
    height: 60rpx;
    line-height: 60rpx;
    margin-left: 20rpx;
    border-radius: 30rpx;
    font-size: 24rpx;
    border: 1px solid #cccccc;
    white-space: nowrap;
    background: #ffffff;
}

.order-list .order-bts button::after {
    display: none;
}

.order-list .order-bts button.btn-border-red {
    border: 1px solid $dominant-color;
    font-size: 24rpx;
    color: $dominant-color;
}

.order-list .order-bts button.btn-red {
    background: $dominant-color;
    border: 1px solid $dominant-color;
    font-size: 24rpx;
    color: #ffffff;
}

.buy-checkout {
    width: 100%;
}

.buy-checkout .item {
    min-height: 50rpx;
    line-height: 50rpx;
    padding: 20rpx;
    display: flex;
    justify-content: space-between;
    font-size: 28rpx;
}

.buy-checkout .iconfont.icon-weixin {
    color: #04be01;
    font-size: 50rpx;
}

.buy-checkout .iconfont.icon-yue {
    color: #f0de7c;
    font-size: 50rpx;
}

.buy-checkout .item.active .iconfont.icon-xuanze {
    color: #04be01;
}
</style>
