<template>
	<view class="container">
		<view class="chat-container">
			<!-- 聊天消息列表 -->
			<view class="message" v-for="(msg, index) in messages" :key="index"
				:class="{'user-message': msg.isUser, 'ai-message': !msg.isUser}">
				<view :class="['avatar', { 'user-avatar': msg.isUser, 'ai-avatar': !msg.isUser }]">
					<image class="avatar-img"
						:src="msg.isUser ? '/static/images/Swiper/swiper1.jpg' : '/static/images/Swiper/swiper1.jpg'"
						alt="avatar" />
				</view>
				<view class="message-content">{{ msg.text }}</view>
			</view>
		</view>

		<!-- 输入框和发送按钮 -->
		<view class="input-container">
			<input type="text" v-model="inputMessage" @keyup.enter="sendMessage" placeholder="输入消息..." />
			<button @click="sendMessage">发送</button>
		</view>
	</view>
</template>

<script>
	import {
		useUserStore
	} from "../../stores/modules/userStore.js";
	export default {
		setup() {
			const userStore = useUserStore();
			userStore.initUser(); // 初始化用户信息
			return {
				userStore,
			};
		},
		data() {
			return {
				messages: [],
				inputMessage: ''
			};
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
			}
		},
		methods: {
			sendMessage() {
				// 检查输入框内容是否为空
				if (this.inputMessage.trim() !== '') {
					// 发送用户消息
					const message = {
						text: this.inputMessage,
						isUser: true
					};
					this.messages.push(message);
					this.inputMessage = ''; // 清空输入框

					// 调用后端接口获取AI回复
					this.getAIChatResponse(message.text).then(aiResponse => {
						this.messages.push({
							text: aiResponse,
							isUser: false
						});
					}).catch(error => {
						console.error("获取AI回复失败：", error);
					});
				} else {
					console.log("输入框为空，未发送消息");
				}
			},
			getAIChatResponse(message) {
				return new Promise((resolve, reject) => {
					const requestData = {
						perception: {
							inputText: {
								text: message
							}
						}
					};

					uni.request({
						url: "http://localhost:3000/api/aiconsult",
						method: 'POST',
						data: requestData,
						success: (response) => {
							if (response.data && response.data.results && response.data.results[0]
								.values) {
								resolve(response.data.results[0].values.text);
							} else {
								reject('响应格式错误');
							}
						},
						fail: (error) => {
							reject(error);
						}
					});
				});
			}
		}
	};
</script>

<style>
	.container {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #f5f5f5;
		justify-content: space-between;
	}

	/* 聊天消息容器 */
	.chat-container {
		flex: 1;
		/* 使聊天区域占据剩余空间 */
		overflow-y: auto;
		padding: 10px;
		display: flex;
		flex-direction: column;
	}

	/* 消息样式：根据是否是用户消息改变样式 */
	.message {
		display: flex;
		align-items: flex-start;
		margin-bottom: 10px;
		max-width: 80%;
		word-wrap: break-word;
	}

	.ai-message {
		flex-direction: row;
		/* AI消息头像和文本在左侧 */
	}

	.user-message {
		flex-direction: row-reverse;
		/* 用户消息头像和文本在右侧 */
		align-self: flex-end;
		/* 向右对齐 */
	}

	/* 头像样式 */
	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-right: 10px;
	}

	.avatar-img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	/* 用户头像和消息对齐方式 */
	.user-avatar {
		margin-left: 10px;
	}

	.ai-avatar {
		margin-right: 10px;
	}

	/* 消息内容样式 */
	.message-content {
		padding: 10px;
		border-radius: 10px;
		max-width: 75%;
		background-color: #f1f1f1;
		color: #333;
	}

	.user-message .message-content {
		background-color: #4ac8bd;
		color: white;
		text-align: right;
	}

	.ai-message .message-content {
		background-color: #f1f1f1;
		color: #333;
	}

	/* 输入框和按钮容器 */
	.input-container {
		display: flex;
		align-items: center;
		padding: 10px;
		background-color: white;
		border-top: 1px solid #ccc;
	}

	input {
		flex: 1;
		height: 40px;
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 0 10px;
		margin-right: 10px;
		font-size: 16px;
	}

	button {
		height: 40px;
		background-color: #4ac8bd;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}
</style>