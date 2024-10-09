<template>
	<view class="wrapper">
		<view class="search-box">
			<view class="back-icon iconfont icon-zuojiantou" @click="goBack"></view>
			<input class="search-input" type="text" placeholder="输入搜索内容" />
			<view class="iconfont icon-sangedian"></view>
		</view>
		<navigator class="article-list" url="/pages/index/Article/ArticleContent">
			<view class="article-item">
				<image class="article-image" src="../../../static/images/Swiper/swiper1.jpg" ></image>
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
		</navigator>
	</view>
</template>

<script>
	import ArticleContent from './ArticleContent.vue';
	export default {
	  methods: {
	    goBack() {
	      uni.navigateBack({
	        delta: 1 // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
	      });
	    }
	  }
	};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}
.back-icon {
  position: absolute;
  left: 20rpx; 
  top: 25rpx;
  z-index: 999;
  cursor: pointer;
}
.search-box {
  display: flex;
  padding: 10rpx;
  padding-left: 70rpx;
  background-color: #fff;
  border-radius: 5px;
/*  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
}

.search-input {
  flex: 1;
  height: 50rpx;
  padding: 0 10px;
  border: 1px solid #4ac8bd;
  border-radius: 15upx;
  outline: none;
}s
.search-icon {
  width: 20px;
  height: 30px;
  margin-left: 10px;
}
.article-list {
	padding: 20rpx;
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