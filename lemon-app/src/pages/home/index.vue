<template>
    <view class="page-component-container__home">
        <!-- 搜索框 -->
		<view class="index-search-box" id="searchBox">
			<view class="index-search t-c" @click="gotoSearch">
				<span class="icon iconfont icon-sousuo"></span>
				<text class="ml10">{{ query.name }}</text>
			</view>
		</view>
        <view class="product-content">
            <product class="product-item" v-for="product in products" :key="product.id" :data="product"></product>
        </view>
    </view>
</template>

<script>
import Product from './components/product.vue';
	export default {
        components: {
            Product,
        },
		data() {
			return {
                query: {
                    pageNum: 1,
                    name: '',
                },
                pagenation: {
                    total: 0,
                    pageNum: 1,
                    pageSize: 10,
                },
                products: [],
			}
        },
        onShow() {
            this.updateData();
        },
		onLoad() {
            // this.updateData();
		},
		methods: {
            updateData() {
                const _self = this;
                this._get(true, 'queryCargo', this.query, function({ data }) {
                    _self.products = data.list ? data.list : [];
                    _self.pagenation = {
                        total: data.total,
                        pageNum: data.pageNum,
                        pageSize: data.pageSize,
                    };
                });
            },
            /*跳转搜索页面*/
            gotoSearch() {
                uni.navigateTo({
                    url: '/pages/product/search/search'
                });
            },
		}
	}
</script>

<style lang="scss">
.product-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .product-item {
        // width: 175rpx;
        image {
            width: 350rpx;
            height: 350rpx;
        }
    }
}
</style>
