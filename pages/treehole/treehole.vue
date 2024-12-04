<template>
	<view class="wrapper">
		<view v-for="post in posts" :key="post.id" class="post-list">
			<view class="top">
				<img :src="post.users_image" class="avatar" />
				<view class="name">{{ post.users_nickname }}</view>
				<view class="time">{{ post.date }}</view>
			</view>
			<view class="message">{{ post.posts_content }}</view>
			<view class="foot">
				<view class="foot-left">#{{ post.tag }}</view>
				<view class="foot-right">
					<text class="iconfont icon-xihuan" :class="{ liked: post.liked }" @click="toggleLike(post)">
						赞{{ post.like_count }}&nbsp;&nbsp;
					</text>
					<text class="iconfont icon-xiaoxi" @click="toggleComments(post)">
						评论{{ post.comment_count }}
					</text>
				</view>
			</view>

			<!-- 评论区 -->
			<view v-if="post.showComments" class="comments-section">
				<!-- 评论输入框 -->
				<view class="comment-input">
					<input v-model="post.newCommentContent" placeholder="发表评论..." />
					<view class="sendComments" @click="addComment(post)">发布</view>
				</view>

				<view v-for="comment in post.comments" :key="comment.comment_id" class="comment-list">
					<view class="top">
						<img :src="comment.users_image" class="avatar" />
						<view class="comment-name">{{ comment.nickname }}</view>
						<view class="time">{{ comment.created_at }}</view>
					</view>
					<view class="comment-message">{{ comment.comment_content }}</view>
					<view class="comment-footer">
						<view class="comment-delete iconfont icon-shanchu"
							@click="deletePostComment(comment.comment_id, comment.user_id)"></view>
						<view class="iconfont icon-xihuan" :class="{ liked: comment.liked }"
							@click="toggleLikeComment(comment)">
							赞{{ comment.comment_like_count }}
						</view>
					</view>
				</view>

			</view>
		</view>

		<!-- 悬浮加号按钮 -->
		<view class="floating-button" @click="navigateToPublish">
			<text class="plus">+</text>
		</view>
	</view>
</template>

<script>
	import {
		useUserStore
	} from "../../stores/modules/userStore.js";

	export default {
		data() {
			return {
				posts: [], // 用于存储情绪分享列表
			};
		},
		setup() {
			const userStore = useUserStore();
			userStore.initUser(); // 初始化用户信息

			// 格式化日期yy-mm-dd HH:mm
			const formatDate = (dateString) => {
				if (!dateString) return '未填写';

				const date = new Date(dateString);
				const year = date.getFullYear();
				const month = (date.getMonth() + 1).toString().padStart(2, '0');
				const day = date.getDate().toString().padStart(2, '0');
				const hours = date.getHours().toString().padStart(2, '0');
				const minutes = date.getMinutes().toString().padStart(2, '0');
				const seconds = date.getSeconds().toString().padStart(2, '0');

				return `${year}-${month}-${day} ${hours}:${minutes}`;
			};

			return {
				userStore,
				formatDate,
			};
		},
		methods: {
			fetchPosts() {
				uni.request({
					url: "http://localhost:3000/api/posts", // 请求情绪分享列表
					method: "GET",
					success: (res) => {
						if (res.data.success === "0") {
							this.posts = res.data.data.map((post) => ({
								...post,
								liked: false, // 默认未点赞
								date: this.formatDate(post.date), // 格式化日期字段
								newCommentContent: '', // 每个帖子独立的评论输入内容
								showComments: false, // 默认隐藏评论区
								comments: [],
							}));
							this.fetchCommentsForPosts();
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none",
							});
						}
					},
					fail: (error) => {
						uni.showToast({
							title: "加载失败，请稍后再试",
							icon: "none",
						});
					},
				});
			},
			toggleLike(post) {
				const api = post.liked ?
					`http://localhost:3000/api/posts/${post.posts_id}/unlike` :
					`http://localhost:3000/api/posts/${post.posts_id}/like`;

				uni.request({
					url: api,
					method: "POST",
					success: (res) => {
						if (res.data.success) {
							// 更新点赞状态和计数
							post.liked = !post.liked;
							post.like_count += post.liked ? 1 : -1;
							const msg = post.liked ? "点赞成功" : "取消点赞成功";
							uni.showToast({
								title: msg,
								icon: "success",
							});
						} else {
							const msg = post.liked ? "取消点赞失败" : "点赞失败";
							uni.showToast({
								title: msg,
								icon: "none",
							});
						}
					},
					fail: (error) => {
						uni.showToast({
							title: "操作失败，请稍后再试",
							icon: "none",
						});
					},
				});
			},
			fetchCommentsForPosts() {
				this.posts.forEach((post) => {
					uni.request({
						url: `http://localhost:3000/api/posts/${post.posts_id}/comments`, // 获取评论列表
						method: "GET",
						success: (res) => {
							if (res.data.success) {
								post.comments = res.data.comments.map(comment => ({
									...comment,
									created_at: this.formatDate(comment
										.created_at), // 格式化评论日期字段
								}));
								post.comment_count = post.comments.length;
							}
						},
					});
				});
			},
			toggleComments(post) {
				post.showComments = !post.showComments;
			},
			addComment(post) {

				const {
					users_image,
					nickname,
					users_id
				} = this.userStore.userInfo;

				if (!post.newCommentContent) return;

				// 定义当前时间
				const createdAt = this.formatDate(new Date());
				uni.request({
					url: `http://localhost:3000/api/posts/${post.posts_id}/comments`, // 添加评论
					method: "POST",
					data: {
						comment_content: post.newCommentContent,
						user_id: users_id, // 确保发送用户ID,
						created_at: createdAt, // 发送当前时间到后端
					},
					success: (res) => {
						if (res.data.success) {
							post.comments.push({
								comment_content: post.newCommentContent,
								like_count: 0,
								users_image: users_image,
								users_nickname: nickname,
							});
							post.comment_count += 1;
							post.newCommentContent = ""; // 清空输入框
							uni.showToast({
								title: "评论成功",
								icon: "success"
							});
						}
					},
				});
			},
			//删除发布的评论的内容
			deletePostComment(commentId, userId) {
				uni.request({
					url: `http://localhost:3000/api/comments/${commentId}/${userId}`,
					method: 'DELETE',
					success: (response) => {
						console.log("response", response);
						if (response.data.statusCode === 200 && response.data.data.success === true) {
							const post = this.posts.find(p => p.comments.some(c => c.comment_id ===
								commentId));
							if (post) {
								post.comments = post.comments.filter(comment => comment.comment_id !==
									commentId);
							}
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
					},
					fail: (error) => {
						console.error('删除发布内容错误:', error);
						uni.showToast({
							title: '删除发布内容失败，请稍后再试。',
							icon: 'none',
						});
					},
				});
			},
			toggleLikeComment(comment) {
				const api = comment.liked ?
					`http://localhost:3000/api/comments/${comment.comment_id}/unlike` :
					`http://localhost:3000/api/comments/${comment.comment_id}/like`;
				uni.request({
					url: api,
					method: "POST",
					success: (res) => {
						if (res.data.success) {
							comment.liked = !comment.liked;
							comment.comment_like_count += comment.liked ? 1 : -1;
						}
					},
				});
			},
			navigateToPublish() {
				uni.navigateTo({
					url: "/pages/treehole/addPost",
				});
			},
		},
		onLoad() {
			// 检查登录状态
			if (!this.userStore.loginStatus) {
				uni.navigateTo({
					url: "/pages/login/login", // 登录页面的路径
				});
				uni.showToast({
					title: "请先登录！",
					icon: "none",
					duration: 2000,
				});
			} else {
				this.fetchPosts(); // 加载情绪分享列表
				this.posts.forEach(post => {
					this.fetchComments(post);
				});
			}
		},
	};
</script>


<style scoped>
	.wrapper {
		padding-bottom: 10rpx;
	}

	.post-list {
		background-color: none;
		box-shadow: 8rpx 8rpx 0rpx 0rpx darkgrey;
		border: 1.5px solid #4ac8bd;
		border-radius: 20rpx;
		padding: 35rpx;
		margin: 40rpx;
		margin-bottom: 80rpx;
	}

	.avatar {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		margin-right: -250rpx;
	}

	.name {
		margin-right: -80rpx;
	}

	.top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 40rpx;
	}

	.foot {
		display: flex;
		justify-content: space-between;
		margin-top: 40rpx;
	}

	.foot-left {
		font-size: 25rpx;
		color: white;
		background-color: #4ac8bd;
		padding: 8rpx;
		border-radius: 15rpx;
	}

	.icon {
		height: 30rpx;
		width: 30rpx;
	}

	.floating-button {
		position: fixed;
		bottom: 30rpx;
		right: 30rpx;
		width: 100rpx;
		height: 100rpx;
		background-color: #4ac8bd;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 0px 4px darkgrey;
		font-size: 50rpx;
		color: white;
	}

	.liked {
		color: red;
	}

	.comments-section {
		margin-top: 20rpx;
		border-top: 1px solid #ccc;
		padding-top: 20rpx;
	}

	.comment-list {
		margin: 30rpx;
		border-bottom: 1px solid #ccc;
	}

	.sendComments {
		color: #fff;
		background-color: #4ac8bd;
		padding-inline: 20rpx;
		padding-top: 12rpx;
		padding-bottom: 12rpx;
	}

	.comment-input {
		display: flex;
		align-items: center;
	}

	.comment-input input {
		flex: 1;
		border: 1px solid #ccc;
		border-radius: 5rpx;
		padding: 10rpx;
		margin-right: 10rpx;
	}

	.comment-input button {
		background-color: #4ac8bd;
		color: white;
		border: none;
		padding: 10rpx 20rpx;
		border-radius: 5rpx;
		cursor: pointer;
	}

	.comment-input button:hover {
		background-color: #2a9d8f;
	}

	.comment-name {
		margin-right: -150rpx;
	}

	.comment-message {
		margin-bottom: 20rpx;
		border-radius: 0 0 1rpx 0;
	}

	.comment-footer {
		display: flex;
	}

	.comment-delete {
		flex: 1;
		color: #CD3333;
	}
</style>