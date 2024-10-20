<template>
	<view class="article-container">
		<view class="article-header">
			<text class="article-title">{{ article.title }}</text>
		</view>
		<view class="article-meta">
			<text>发布日期：{{ article.publish_date }}</text>
			<text>作者：{{ article.author }}</text>
		</view>
		<view class="article-content">
			<text>{{ article.content }}</text>
		</view>
		<view class="article-actions">
			<text @click="likeArticle">点赞</text>
			<text @click="favoriteArticle">收藏</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article: {} // 存储单篇文章数据
			}
		},
		onLoad() {
		    const pages = getCurrentPages();
		    const currentPage = pages[pages.length - 1]; // 获取当前页面
			console.log('Current Page Options:', currentPage.options); // 调试输出
		    const articleId = currentPage.options.article_id; // 获取传递的文章 ID
		    console.log('Article ID:', articleId); // 调试输出
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
					url: `http://localhost:3000/api/articles/${articleId}`, // 后端接口
					method: 'GET',
					success: (res) => {
						if (res.data.success) {
							this.article = res.data.data; // 更新文章数据
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
			likeArticle() {
				// 实现点赞功能
			},
			favoriteArticle() {
				// 实现收藏功能
			}
		}
	}
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
</style>