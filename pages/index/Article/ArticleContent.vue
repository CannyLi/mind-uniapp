<template>
	<view class="article-container">
		<view class="article-header">
			<view class="article-title">{{ article.title }}</view>
		</view>
		<view class="article-meta">
			<text>发布日期：{{ article.publish_date }}</text><br>
			<text>作者：{{ article.author }}</text>
		</view>
		<view class="article-content">
			<text>{{ article.content }}</text>
		</view>
		<view class="article-actions">
			<view class="iconfont icon-xihuan" :class="{ 'liked': isLiked }" @click="toggleLike">
				赞{{ article.likes }}
			</view>
			<view class="iconfont icon-a-shoucangyishoucang1x1" :class="{ 'favorited': isFavorited }"
				@click="toggleFavorite">
				收藏{{ article.favorites }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article: {}, // 存储单篇文章数据
				isLiked: false, // 标记是否已点赞
				isFavorited: false // 标记是否已收藏
			};
		},
		onLoad() {
			const pages = getCurrentPages();
			const currentPage = pages[pages.length - 1]; // 获取当前页面
			const articleId = currentPage.options.article_id; // 获取传递的文章 ID
			if (articleId) {
				this.fetchArticle(articleId); // 获取文章详情
			} else {
				uni.showToast({
					title: '文章 ID 无效',
					icon: 'none'
				});
			}
		},
		methods: {
			fetchArticle(articleId) {
				uni.request({
					url: `http://localhost:3000/api/articles/${articleId}`, 
					method: 'GET',
					success: (res) => {
						if (res.data.success) {
							this.article = res.data.data; // 更新文章数据
							this.isLiked = this.article.is_liked || false; // 初始化点赞状态
							this.isFavorited = this.article.is_favorited || false; // 初始化收藏状态
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
			toggleLike() {
				if (this.isLiked) {
					this.unlikeArticle();
				} else {
					this.likeArticle();
				}
			},
			likeArticle() {
				uni.request({
					url: `http://localhost:3000/api/articles/${this.article.article_id}/like`,
					method: 'POST',
					success: (res) => {
						if (res.data.success) {
							this.article.likes += 1;
							this.isLiked = true;
						} else {
							uni.showToast({
								title: '点赞失败',
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
			unlikeArticle() {
				uni.request({
					url: `http://localhost:3000/api/articles/${this.article.article_id}/unlike`,
					method: 'POST',
					success: (res) => {
						if (res.data.success) {
							this.article.likes -= 1;
							this.isLiked = false;
						} else {
							uni.showToast({
								title: '取消点赞失败',
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
			toggleFavorite() {
				if (this.isFavorited) {
					this.unfavoriteArticle();
				} else {
					this.favoriteArticle();
				}
			},
			favoriteArticle() {
				uni.request({
					url: `http://localhost:3000/api/articles/${this.article.article_id}/favorite`,
					method: 'POST',
					success: (res) => {
						if (res.data.success) {
							this.article.favorites += 1;
							this.isFavorited = true;
						} else {
							uni.showToast({
								title: '收藏失败',
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
			unfavoriteArticle() {
				uni.request({
					url: `http://localhost:3000/api/articles/${this.article.article_id}/unfavorite`,
					method: 'POST',
					success: (res) => {
						if (res.data.success) {
							this.article.favorites -= 1;
							this.isFavorited = false;
						} else {
							uni.showToast({
								title: '取消收藏失败',
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
		}
	};
</script>

<style scoped>
	.article-container {
		padding: 20px;
	}

	.article-header {
		margin-bottom: 10px;
	}

	.article-title {
		font-size: 24px;
		font-weight: bold;
	}

	.article-meta {
		color: #666;
		margin-bottom: 10px;
	}

	.article-content {
		margin-top: 10px;
	}

	.article-actions {
		display: flex;
		gap: 30rpx;
		margin-top: 50rpx;
		margin-left: 350rpx;
	}

	.liked {
		color: red;
	}

	.favorited {
		color: #4ac8bd;
	}
</style>