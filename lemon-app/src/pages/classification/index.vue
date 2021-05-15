<template>
    <view class="page-component-container__classification">
        <!-- 搜索框 -->
		<view class="index-search-box" id="searchBox">
			<view class="index-search t-c" @click="gotoSearch">
				<span class="icon iconfont icon-sousuo"></span>
				<text class="ml10">{{ searchName }}</text>
			</view>
		</view>
        <view class="category-content">
            <scroll-view class="category-type category--content__item" scroll-y="true" :style="'height:' + scrollviewHigh + 'px;'">
                <view class="list">
                    <view 
                        :class="['cargo-type-item', { 'cargo-type-item-checked': showType === item.name}]" 
                        v-for="(item, index) in cargoTypes"
                        @click="switchCargoType(item.name)" 
                        :key="index"
                    >
                        <text>{{item.name}}</text>
                    </view>
                </view>
            </scroll-view>
            <scroll-view scroll-y="true" class="category-product category--content__item" :style="'height:' + scrollviewHigh + 'px;'">
                <view class="list">
                    <view class="cargo-item" v-for="(item, index) in categoryData" :key="index">
                        <product :data="item"></product>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
    
</template>

<script>
    import Product from '../home/components/product.vue';
	export default {
        components: {
            Product,
        },
		data() {
			return {
                scrollviewHigh: 0,
                showType: '',
                categoryData: [],
                pagenation: {
                    total: 0,
                    pageNum: 1,
                    pageSize: 10,
                },
                nowData: [],
                cargoTypes: [],
			}
        },
        computed: {
            query() {
                return {
                    type: this.showType,
                    pageNum: this.pagenation.pageNum,
                };
            }
        },
		onLoad() {

        },
        created() {
            this.updateCargoType();
        },  
        mounted() {
            // uni.showLoading({
            //     title: '加载中',
            //     mask:true
            // });

		    this.init();
        },
		methods: {
            init() {
                let _this = this;
                uni.getSystemInfo({
                    success(res) {
                        _this.phoneHeight = res.windowHeight;
                        // 计算组件的高度
                        let view = uni.createSelectorQuery().select('#searchBox');
                        view.boundingClientRect(data => {
                            let h = _this.phoneHeight - data.height;
                            _this.scrollviewHigh = h;
                        }).exec();
                    }
                });
            },
            gotoSearch() {
                uni.navigateTo({
                    url: '/pages/product/search/search'
                });
            },
            updateCargoType() {
                const _self = this;
                this._get(true, '/queryType', {}, function({ data }) {
                    _self.cargoTypes = data ? data : [];
                    _self.showType = data.length ? data[0].name : '';
                    _self.updateData();
                });
            },
            switchCargoType(type) {
                if (this.showType !== type)  {
                    this.showType = type;
                    this.updateData();
                }
            },
            updateData() {
                const _self = this;
                _self._get(true, '/queryCargo', _self.query, function({ data }) {
                    _self.categoryData = data.list ? data.list : [];
                    _self.pagenation = {
                        total: data.total,
                        pageNum: data.pageNum,
                        pageSize: data.pageSize,
                    };
                });
            }
		}
	}
</script>

<style lang="scss">
.category-content {
    display: flex;
    padding: 6px 4px 0;
    .category-type {
        box-shadow: 0 0 8rpx 0 rgba(0, 0, 0, 0.1);
        border-radius: 20rpx;
        width: 150rpx;
        .cargo-type-item {
            height: 80rpx;
            line-height: 80rpx;
            padding: 0 8px;
        }
        .cargo-type-item-checked text {
            color: red;
        }
        margin-right: 8rpx;
    }
    .category-content__item {
        display: inline-flex;
    }
    .category-product {
        width: calc(100% - 150rpx);
        // float: right;
        .list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
        image {
            width: 275rpx;
            height: 275rpx;
        }
        .cargo-item {
            box-shadow: 0 0 8rpx rgba(0, 0, 0, 0.1);
            background: #ffffff;
            overflow: hidden;
            border-radius: 20rpx;
            margin: 8rpx 0;
        }
    }
}
</style>
