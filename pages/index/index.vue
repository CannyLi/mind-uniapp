<template>
	<view class="index">
		<view class="uni-flex uni-row intro">
			<view class="left">找到你想要的健康解决方案</view>
		</view>
		<view class="swiper">
			<IndexSwiper></IndexSwiper>
		</view>
		<view class="uni-flex uni-row funtions">
			<navigator class="flex-item" url="/pages/index/Appointment/AppointmentTable">
				<view class="icon-wrapper">
					<text class="iconfont icon-yuyue"></text>
				</view>
				<text class="function-name">预约</text>
			</navigator>
			<navigator class="flex-item" url="/pages/consult/consult" open-type="switchTab">
				<view class="icon-wrapper">
					<text class="iconfont icon-xiaoxi"></text>
				</view>
				<text class="function-name">AI咨询</text>
			</navigator>
			<navigator class="flex-item" url="/pages/index/Article/FullArticle">
				<view class="icon-wrapper">
					<text class="iconfont icon-yixuekepu"></text>
				</view>
				<text class="function-name">文章</text>
			</navigator>
			<navigator class="flex-item" url="/pages/index/Doctor/AllDoctor">
				<view class="icon-wrapper">
					<text class="iconfont icon-yishengxinxi"></text>
				</view>
				<text class="function-name">医生</text>
			</navigator>
		</view>
		<view class="recommand-article">
			<view class="recommand-header">
				<text class="recommand-text">推荐科普</text>
				<navigator class="more-btn f-active-color" url="/pages/index/Article/FullArticle">更多></navigator>
			</view>
			<view v-for="article in articles" :key="article.article_id" @click="goToArticleContent(article)"
				class="article-list" url="/pages/index/Article/ArticleContent">
				<view class="article-item">
					<image class="article-image" :src="article.article_image"></image>
					<view class="article-info">
						<view class="article-title">{{ article.title }}</view>
						<view class="article-meta">
							<text>{{ article.publish_date }}</text>
							<view class="article-actions">
								<view class="iconfont icon-xihuan">{{ article.likes }}</view>
								<view class="iconfont icon-a-shoucangyishoucang1x1">{{ article.favorites }}</view>
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
	import FullArticle from '../../pages/index/Article/FullArticle.vue';
	import ArticleContent from '../../pages/index/Article/ArticleContent.vue';
	import AllDoctor from './Doctor/AllDoctor.vue';
	import AppointmentTable from './Appointment/AppointmentTable.vue';

	export default {
		data() {
			return {
				articles: []
			}
		},
		components: {
			IndexSwiper,
			FullArticle
		},
		onLoad() {
			this.fetchArticles();
		},
		methods: {
			fetchArticles() {
				uni.request({
					url: 'http://localhost:3000/api/articles',
					method: 'GET',
					success: (res) => {
						console.log('Fetched article:', res.data); // 查看获取的文章数据
						if (res.data.success) {
							this.articles = res.data.data; //更新文章数据
						} else {
							uni.showToast({
								title: '获取文章失败',
								icon: 'none'
							});
						}
					},
					fail: () => {
						uni.showToast({
							title: '请求失败，请稍后重试。',
							icon: 'none'
						});
					}
				});
			},
			goToArticleContent(article) {
				console.log('Navigating to article ID:', article.article_id);
				uni.navigateTo({
					url: `/pages/index/Article/ArticleContent?article_id=${article.article_id}` // 使用反引号
				});
			},
		}
	}
</script>

<style scoped>
	.index {
		display: flex;
		flex-direction: column;
	}

	.intro {
		padding: 10rpx;
		padding-inline: 35rpx;
		height: 80upx;
		font-size: 45rpx;
	}

	.left {
		margin: 0 auto;
		width: 100%;
	}

	.swiper {
		width: 100%;
		height: 200upx;
	}

	.funtions {
		padding-inline: 15rpx;
		padding-top: 50rpx;
		display: flex;
		justify-content: space-around;
	}

	.flex-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 100rpx;
		color: #ffffff;
	}

	.icon-wrapper {
		background-color: #4ac8bd;
		border-radius: 25rpx;
		padding: 15rpx;
		padding-top: 2rpx;
		padding-bottom: 2rpx;
		margin-bottom: 10rpx;
	}

	.iconfont {
		font-size: 100rpx;
	}

	.function-name {
		font-size: 28rpx;
		color: #000;
	}

	.recommand-article {
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
		height: 150rpx;
		padding-bottom: 30rpx;
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