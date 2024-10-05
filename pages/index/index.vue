<template>
	<view class="index">
		<view class="uni-flex uni-row intro">
            <view class="flex-item left">找到你想要的健康解决方案</view>
		</view>
		<view class="swiper">
			<IndexSwiper></IndexSwiper>
		</view>
		<view class="uni-flex uni-row funtions">
			<view class="flex-item iconfont icon-yuyue"></view>
			<view class="flex-item iconfont icon-xiaoxi"></view>
			<view class="flex-item iconfont icon-yishengxinxi"></view>
			<view class="flex-item iconfont icon-yixuekepu"></view>
		</view>
		<view class="recommand-article">
			<view class="recommand-header">
				<text class="recommand-text">推荐科普</text>
				<view class="more-btn f-active-color">更多></view>
			</view>
			<view class="article-list">
				<view class="article-item">
					<image class="article-image" src="../../static/images/Swiper/swiper1.jpg" mode=""></image>
					<view class="article-info">
						<view class="article-title">文章标题</view>
						<view class="article-meta">
							<text>发布日期</text>
							<view class="article-actions">
								<text>点赞</text>
								<text>收藏</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import IndexSwiper from '../../components/index/IndexSwiper.vue';
	export default {
		data() {
			return {
				
			}
		},
		components:{
			IndexSwiper
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style scoped>
.intro{
	padding: 10rpx;
	padding-inline: 35rpx;
	height: 80upx;
	font-size: 45rpx;
}
.left{
	margin: 0 auto;
	width: 100%;
}
.funtions{
	padding-inline: 15rpx;
	padding-top: 50rpx;
	font-size: 110rpx;
}
.iconfont{
	font-size: 100rpx;
	padding: 15rpx;
	margin: 0 auto;
	color: #ffffff;
	background-color: #4ac8bd;
	border-radius: 25rpx;
}
.recommand-article{
	padding-top: 50rpx;
	padding-inline: 35rpx;
}
.recommand-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
}
.recommand-text {
	font-size: 40rpx;
	font-weight: bold;
}
.more-btn {
	font-size: 30rpx;
	color: #4ac8bd;
	cursor: pointer;
}
.article-list {
	display: flex;
	flex-direction: column;
}
.article-item {
	display: flex;
	margin-bottom: 40rpx;
}
.article-image {
	width: 300rpx;
	height: 150rpx;
	border-radius: 10rpx;
	margin-right: 20rpx;
}
.article-info {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-left: 20rpx;
}
.article-title {
	font-size: 35rpx;
	font-weight: bold;
	color: #333;
}
.article-meta {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 28rpx;
	color: #999;
}
.article-actions {
	display: flex;
	gap: 10rpx;
}
.article-actions text {
	font-size: 28rpx;
	color: #666;
}

</style>
