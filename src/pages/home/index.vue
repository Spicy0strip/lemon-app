<template>
    <view class="page-component-container__home">
        <!-- 搜索框 -->
		<view class="index-search-box" id="searchBox">
			<view class="index-search t-c" @click="gotoSearch">
				<span class="icon iconfont icon-sousuo"></span>
				<text class="ml10">{{ searchName }}</text>
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
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
</style>
