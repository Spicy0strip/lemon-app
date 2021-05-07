<template>
    <view class="page-component-container__product" v-if="data">
        <image :src="data.imageUrl"/>
        <view class="product-info">
            <!-- 商品名称 -->
            <view v-if="data.name" class="product-title">
                <text>{{ data.name }}</text>
            </view>
            <!-- 商品卖点 -->
            <view v-if="data.detail" class="product-detail">
                <text>{{ data.detail }}</text>
            </view>
            <!-- 商品销量 -->
            <view v-if="data.sale" class="already-sale">
                <text>已售{{ data.product_sales }}件</text>
            </view>
            <!-- 商品价格 -->
            <view class="price d-s-c">
                <view v-if="data.price" class="orange">
                    <text>¥</text>
                    <text class="">{{ data.price }}</text>
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
			}
        },
        props: {
            data: {
                type: Object,
                default: null,
            }
        },
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
</style>
