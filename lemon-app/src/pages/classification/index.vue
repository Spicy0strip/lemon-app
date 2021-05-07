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
            <view class="category-type" v-for="category in cotegoryData" :key="category.id">
                {{ category.name }}
			</view>
            <scroll-view scroll-y="true" class="scroll-Y" :style="'height:' + scrollviewHigh + 'px;'">
                <view class="list">
                    <view class="item" v-for="(item, index) in nowData" :key="index">
                        <!-- <image :src="hasImages(item)" mode="aspectFit"></image> -->
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
    
</template>

<script>
import { } from '@dcloudio/uni-ui';
	export default {
        components: {
        },
		data() {
			return {
                scrollviewHigh: 0,
                show_type: 0,
                categoryData: [],
                nowData: [],
			}
		},
		onLoad() {

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
		}
	}
</script>

<style lang="scss">
</style>
