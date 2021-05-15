<template>
	<div>
		<!--地址-->
		<template v-if="!addresses.length">
			<view class="add-address d-s-c" @click="addAddress()">
				<view class="icon-box mr10">
					<span class="icon iconfont icon-dizhi1"></span>
				</view>
				<text>请选择自提点</text>
			</view>
		</template>
		<template v-else>
			<view class="address-defalut-wrap">
				<view class="info d-s-s">
					<text class="state">当前自提点</text>
					<!-- <text class="province-c-a flex-1">{{addresses[0]}} </text> -->
				</view>
				<view class="address">
					<text class="fb gray3">{{defaultAddress}} </text>
					<view class="icon-box" @click="addAddress()">
						<span class="icon iconfont icon-jiantou"></span>
					</view>
				</view>
				<view class="user">
					<text class="name">柠檬社区提供商</text>
					<text class="tel">18220797985</text>
				</view>
			</view>
		</template>
		<view class="addree-bottom">
			<view class="stripe" v-for="(item,index) in 10" :key="index">
				<text :class="index%2==0?'red':'blue'"></text>
				<text class="white"></text>
			</view>
		</view>

		<!--自取人的信息-->
		<view class="buy-checkout">
			<view class="item">
				<text class="key">联系人：</text>
				<input type="text" v-model="myInfo.name"  class="flex-1" placeholder-style="color:#cccccc;font-size:24rpx;" placeholder="请输入联系人"
				 value="" />
			</view>
			<view class="item">
				<text class="key">联系电话：</text>
				<input type="text" v-model="myInfo.phone" class="flex-1" placeholder-style="color:#cccccc;font-size:24rpx;" placeholder="请输入联系电话"
				 value="" />
			</view>
		</view>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
                phone:'',
			}
		},
		props: {
            addresses: {
                type: Array,
                default: () => [],
            },
            defaultAddress: {
                type: String,
                default: '',
            },
            myInfo: {
                type: Object,
                default: {
                    name: '',
                    phone: '',
                }
            }
        },
		methods: {
			/*添加地址*/
			addAddress() {
                uni.setStorageSync('my-info-address', JSON.stringify(this.myInfo));
				uni.navigateTo({
					url: "/pages/mine/address/index",
				});
            },
        },
        
	}
</script>

<style>
</style>
