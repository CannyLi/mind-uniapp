<template>
	<view class="login-container">
		<view class="input-group">
			<view class="label">头像</view>
			<view class="avatar-upload" @click="chooseAvatar">
				<image v-if="users_image" :src="users_image" class="avatar-preview" />
				<view v-else class="upload-placeholder">点击上传头像</view>
			</view>
		</view>

		<view class="input-group">
			<view class="label">昵称</view>
			<input type="text" placeholder="请输入昵称" v-model="nickname" />
		</view>

		<view class="input-group">
			<view class="label">手机</view>
			<input type="text" placeholder="请输入手机号" v-model="mobile_phone" />
		</view>

		<button @click="handleSave" class="login-button">保存设置</button>
	</view>
</template>

<script>
	import {
		useUserStore
	} from '@/stores/modules/userStore.js'; // Pinia Store

	export default {
		data() {
			return {
				nickname: '',
				mobile_phone: ''
			};
		},
		setup() {
			const userStore = useUserStore();
			return {
				userStore,
				users_image: userStore.userInfo.users_image,
			};
		},
		methods: {
			// 选择头像
			chooseAvatar() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						const filePath = res.tempFilePaths[0];
						// 转换图片为 Base64
						uni.getFileSystemManager().readFile({
							filePath: filePath,
							encoding: 'base64',
							success: (readRes) => {
								// 将 Base64 数据添加到 users_image
								const base64Image = 'data:image/png;base64,' + readRes.data;
								this.users_image = base64Image; // 更新本地数据
								this.userStore.userInfo.users_image = base64Image; // 同步到 Pinia
							},
						});
					},
				});
			},
			// 保存设置
			handleSave() {
				if (!this.nickname || !this.mobile_phone) {
					uni.showToast({
						title: '请完整填写信息！',
						icon: 'none',
					});
					return;
				}
				// 验证手机号长度是否为11位
				if (!/^1[3-9]\d{9}$/.test(this.mobile_phone)) {
					uni.showToast({
						title: '请输入有效的11位手机号',
						icon: 'none',
					});
					return;
				}
				uni.showLoading({
					title: '保存中...',
				});

				// 如果有头像，直接使用 Base64 数据
				let users_image = this.users_image;
				this.saveUserInfo(users_image);
			},

			saveUserInfo(users_image) {
				uni.request({
					url: 'http://localhost:3000/api/saveUser',
					method: 'POST',
					data: {
						users_image: users_image, // 发送 Base64 数据
						nickname: this.nickname,
						mobile_phone: this.mobile_phone,
					},
					success: (res) => {
						console.log('后端响应:', res);
						uni.hideLoading();
						if (res.data.data.success) {
							// const userInfo = {
							// 	users_image: users_image,
							// 	nickname: this.nickname,
							// 	mobile_phone: this.mobile_phone,
							// 	users_id: res.data.data.userInfo.users_id
							// };
							const userInfo = {
								users_image: this.users_image || res.data.data.userInfo
								.users_image, // 使用本地头像或后端返回头像
								nickname: this.nickname,
								mobile_phone: this.mobile_phone,
								users_id: res.data.data.userInfo.users_id
							};

							this.userStore.login(userInfo);

							uni.showToast({
								title: '设置保存成功',
								icon: 'success',
							});

							// 初始化用户信息
							this.userStore.initUser();

							uni.switchTab({
								url: '/pages/index/index',
							});
						} else {
							uni.showToast({
								title: res.data.data.msg,
								icon: 'none',
							});
						}
					},
					fail: (err) => {
						uni.hideLoading();
						console.error('请求失败:', err);
						uni.showToast({
							title: '请求失败，请稍后再试',
							icon: 'none',
						});
					}
				});
			}

		},
		// 页面加载时获取用户信息
		mounted() {
			// 初始化用户信息（从Pinia store 获取）
			if (this.userStore.loginStatus) {
				this.users_image = this.userStore.userInfo.users_image;
				this.nickname = this.userStore.userInfo.nickname;
				this.mobile_phone = this.userStore.userInfo.mobile_phone;
			}
		}
	};
</script>




<style scoped>
	.login-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.label {
		width: 15%;
		margin: 10px 0;
		font-size: 16px;
		font-weight: bold;
		text-align: left;
	}

	input {
		width: 100%;
		padding: 10px;
		margin: 10px 0;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.input-group {
		display: flex;
		align-items: center;
		width: 90%;
		margin: 10px 0;
	}

	.others {
		display: flex;
		justify-content: space-between;
		width: 90%;
	}

	.forget-btn {
		text-align: left;
		width: 100%;
	}

	.gotologin {
		width: 100%;
		text-align: right;
	}

	.login-button {
		width: 70%;
		height: 100rpx;
		padding: 10px;
		background-color: #4ac8bd;
		color: white;
		border: none;
		border-radius: 4px;
		margin-top: 20px;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.avatar-upload {
		width: 100px;
		height: 100px;
		margin: 10px 0;
		border-radius: 50%;
		background-color: #f0f0f0;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.upload-placeholder {
		font-size: 12px;
		color: #999;
	}

	.avatar-preview {
		width: 100px;
		height: 100px;
		object-fit: cover;
	}

	.other-login {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 20px;
	}

	.wechat-icon {
		margin-top: 50rpx;
		width: 50px;
		height: 50px;
	}
</style>