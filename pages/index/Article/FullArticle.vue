<template>
	<view class="wrapper">
		<view class="article-search ">
			<input class="uni-input" confirm-type="search" placeholder="搜索" />
		</view>
		<view class="article-list">
			<view v-for="article in articles" :key="article.article_id" class="article-item" @click="goToArticleDetail(article)">
				<image class="article-image" :src="article.article_image"></image>
				<view class="article-info">
					<view class="article-title">{{ article.title }}</view>
					<view class="article-meta">
						<text>{{ article.publish_date }}</text>
						<view class="article-actions">
							<view class="iconfont icon-xihuan">{{ article.likes }} </view>
							<view class="iconfont icon-a-shoucangyishoucang1x1">{{ article.favorites }} </view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default { 
		data() {
			return {
				articles: [] // 存储文章数据
			}
		}, 
		onLoad() {
			this.fetchArticles(); // 页面加载时获取所有文章
		},
		methods: {
			fetchArticles() {
				uni.request({
					url: 'http://localhost:3000/api/articles', // 后端接口
					method: 'GET',
					success: (res) => {
						if (res.data.success) {
							this.articles = res.data.data; // 更新文章数据
						} else {
							uni.showToast({
								title: '获取文章失败',
								icon: 'none'
							});
						}
					},
					fail: () => {
						uni.showToast({
							title: '请求失败，请稍后重试',
							icon: 'none'
						});
					}
				});
			},
			goToArticleDetail(article) {
				console.log('Navigating to article ID:', article.article_id);
				uni.navigateTo({
					url: `/pages/index/Article/ArticleContent?article_id=${article.article_id}` // 传递文章 ID
				});
			}
		}
	}
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
}

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
    gap: 8rpx; 
}
.article-actions text, 
.article-actions .iconfont {
    font-size: 28rpx;
}
	
</style>