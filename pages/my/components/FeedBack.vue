<template>
	<view class="feedback">
		<!-- 输入框 -->
		<textarea class="feedback-input" placeholder="请输入您的反馈意见（最多1000字）" v-model="feedback"
			@input="updateFeedbackLength" maxlength="1000" />
		<!-- 字数统计 -->
		<view class="feedback-length">{{ feedback.length }}/1000</view>

		<!-- 提交按钮 -->
		<button class="submit-btn" @click="submitFeedback">提交反馈</button>
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
			userStore.initUser();

			const feedback = ref('');
			const maxFeedbackLength = 1000;

			// 检查登录状态
			const checkLoginStatus = () => {
				if (!userStore.loginStatus) {
					uni.navigateTo({
						url: '/pages/login/login', // 登录页面的路径
					});
					uni.showToast({
						title: '请先登录！',
						icon: 'none',
						duration: 2000,
					});
				}
			};

			// 提交反馈意见
			const submitFeedback = async () => {
				if (!feedback.value.trim()) {
					uni.showToast({
						title: '请输入反馈内容',
						icon: 'none',
						duration: 2000,
					});
					return;
				}

				try {
					const response = await uni.request({
						url: 'http://localhost:3000/api/feedback',
						method: 'POST',
						data: {
							users_id: userStore.userInfo.users_id, // 当前登录用户的 ID
							feedback: feedback.value,
						},
					});

					if (response.statusCode === 200 && response.data.success) {
						uni.showToast({
							title: '反馈提交成功',
							icon: 'success',
						});
						feedback.value = ''; // 清空输入框
						uni.navigateBack({
							delta: 1
						});
					} else {
						uni.showToast({
							title: '提交反馈失败',
							icon: 'none',
						});
					}
				} catch (error) {
					console.error('提交反馈失败:', error);
					uni.showToast({
						title: '提交失败，请稍后再试',
						icon: 'none',
					});
				}
			};

			// 在页面加载时检查登录状态
			onMounted(() => {
				checkLoginStatus();
			});

			return {
				feedback,
				maxFeedbackLength,
				submitFeedback,
			};
		},
	};
</script>

<style scoped>
	.feedback {
		padding: 20px;
	}

	.feedback-input {
		width: 94%;
		height: 200px;
		border: 1px solid #ccc;
		border-radius: 8px;
		padding: 10px;
		font-size: 16px;
		line-height: 1.5;
	}

	.feedback-length {
		text-align: right;
		margin-top: 5px;
		font-size: 14px;
		color: #666;
	}

	.submit-btn {
		margin-top: 15px;
		width: 100%;
		background-color: #4ac8bd;
		color: white;
		border: none;
		padding: 10px 0;
		font-size: 16px;
		border-radius: 8px;
		cursor: pointer;
	}

	.submit-btn:hover {
		background-color: #3aaaa4;
	}
</style>