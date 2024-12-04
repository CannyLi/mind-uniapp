<template>
	<view class="myrelease">
		<view v-if="posts.length === 0">
			您还没有发布任何信息。
		</view>
		<view v-else>
			<view class="post-item" v-for="(post, index) in posts" :key="post.posts_id">
				<view class="post-info">
					<view class="post-field">
						<text class="field-label">发布人</text>
						<text class="field-value">{{ post.nickname }}</text>
					</view>
					<view class="post-field">
						<text class="field-label">发布内容</text>
						<text class="field-value">{{ post.posts_content }}</text>
					</view>
					<view class="post-field">
						<text class="field-label">标签</text>
						<text class="field-value">{{ post.tag }}</text>
					</view>
					<view class="post-field">
						<text class="field-label">点赞数</text>
						<text class="field-value">{{ post.like_count }}</text>
					</view>
				</view>
				<view class="post-actions">
					<button class="delete-btn iconfont icon-shanchu" @click="deletePost(post.posts_id)">删除</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		useUserStore
	} from '@/stores/modules/userStore.js';
	import {
		ref,
		onMounted
	} from 'vue';

	export default {
		setup() {
			const userStore = useUserStore();
			const posts = ref([]);

			// 获取当前用户的发布信息
			const fetchPosts = async () => {
				try {
					const response = await uni.request({
						url: `http://localhost:3000/api/posts/user/${userStore.userInfo.users_id}`,
						method: 'GET',
					});
					console.log("response", response.data);
					if (response.statusCode === 200 && response.data.success === "0") {
						posts.value = response.data.data;
					} else {
						uni.showToast({
							title: '获取发布信息失败',
							icon: 'none',
						});
					}
				} catch (error) {
					console.error('获取发布信息错误:', error);
					uni.showToast({
						title: '获取发布信息失败，请稍后再试。',
						icon: 'none',
					});
				}
			};

			// 删除发布的内容
			const deletePost = async (postId) => {
				try {
					const response = await uni.request({
						url: `http://localhost:3000/api/posts/${postId}`,
						method: 'DELETE',
					});
					if (response.statusCode === 200 && response.data.success === "0") {
						posts.value = posts.value.filter(post => post.posts_id !== postId);
						uni.showToast({
							title: '删除成功',
							icon: 'success',
						});
					} else {
						uni.showToast({
							title: '删除失败',
							icon: 'none',
						});
					}
				} catch (error) {
					console.error('删除发布内容错误:', error);
					uni.showToast({
						title: '删除发布内容失败，请稍后再试。',
						icon: 'none',
					});
				}
			};

			// 在页面加载时获取发布信息
			onMounted(() => {
				fetchPosts();
			});

			return {
				posts,
				deletePost,
				userStore,
			};
		},

		onLoad() {
			// 检查登录状态
			if (!this.userStore.loginStatus) {
				uni.navigateTo({
					url: '/pages/login/login', // 登录页面的路径
				});
				uni.showToast({
					title: '请先登录！',
					icon: 'none',
					duration: 2000,
				});
			}
		}
	};
</script>

<style scoped>
	.myrelease {
		padding: 20px;
	}

	.post-item {
		margin-bottom: 10px;
		border: none;
		border-radius: 8px;
		background-color: #fff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		padding: 15px;
	}

	.post-info {
		margin-bottom: 15px;
	}

	.post-field {
		display: flex;
		flex-wrap: wrap;
		/* 允许内容换行 */
		justify-content: space-between;
		margin-bottom: 10px;
	}

	.field-label {
		font-weight: bold;
		color: #333;
	}

	.field-value {
		color: #666;
	}

	.post-actions {
		display: flex;
		justify-content: flex-end;
	}

	.delete-btn {
		background-color: #4ac8bd;
		color: #fff;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
	}

	.delete-btn:hover {
		color: #333;
	}
</style>