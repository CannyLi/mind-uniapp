<template>
	<view class="wrapper">
		<view class="article-search">
			<input class="uni-input iconfont icon-sousuo" confirm-type="search" v-model="searchQuery" placeholder="搜索文章"
				@confirm="searchArticles" />
		</view>
		<view class="article-list">
			<view v-for="article in articles" :key="article.article_id" class="article-item"
				@click="goToArticleDetail(article)">
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
				articles: [], // 存储文章数据
				searchQuery: '', // 存储搜索关键词
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
			// 搜索文章
			searchArticles() {
				if (this.searchQuery.trim() === '') {
					this.fetchArticles(); // 如果搜索框为空，显示所有文章
				} else {
					uni.request({
						url: `http://localhost:3000/api/articles/search?q=${this.searchQuery}`, // 搜索接口
						method: 'GET',
						success: (res) => {
							if (res.data.success) {
								this.articles = res.data.data; // 更新搜索结果
							} else {
								uni.showToast({
									title: '没有找到相关文章',
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
				}
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

	.article-search {
		display: flex;
		align-items: center;
	}

	.uni-input {
		display: flex;
		align-items: center;
		padding-left: 30rpx;
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