<template>

	<view class="settings">
		<!-- 头像显示 -->
		<view class="avatar-upload" @click="chooseAvatar">
			<view class="upload-placeholder">上传头像</view>
			<image class="avatar-preview" :src="userStore.userInfo.users_image" mode="aspectFill">
			</image>
		</view>

		<view class="user-details">
			<!-- 昵称 -->
			<view class="input-group">
				<view class="label">昵称</view>
				<input class="input" v-if="isEditing" v-model="nickname"
					:placeholder="userStore.userInfo.nickname || '未填写'" />
				<view v-else>{{ userStore.userInfo.nickname  }}</view>
			</view>

			<!-- 真实姓名 -->
			<view class="input-group">
				<view class="label">真实姓名</view>
				<input class="input" v-if="isEditing" v-model="realName"
					:placeholder="userStore.userInfo.real_name || '未填写'" />
				<view v-else>{{ userStore.userInfo.real_name  }}</view>
			</view>

			<!-- 性别 -->
			<view class="input-group">
				<view class="label">性别</view>
				<input class="input" v-if="isEditing" v-model="gender"
					:placeholder="userStore.userInfo.gender || '未填写'" />
				<view v-else>{{ userStore.userInfo.gender  }}</view>
			</view>

			<!-- 手机号 -->
			<view class="input-group">
				<view class="label">手机号码</view>
				<input class="input" v-if="isEditing" v-model="mobilePhone"
					:placeholder="userStore.userInfo.mobile_phone || '未填写'" />
				<view v-else>{{ userStore.userInfo.mobile_phone }}</view>
			</view>

			<!-- 生日 -->
			<view class="input-group">
				<view class="label">生日(YY-MM-DD)</view>
				<input class="input" v-if="isEditing" v-model="birthday"
					:placeholder="userStore.userInfo.birthday || '格式必须是YY-MM-DD'" />
				<view v-else>{{ userStore.userInfo.birthday  }}</view>
			</view>

			<!-- 邮箱 -->
			<view class="input-group">
				<view class="label">邮箱</view>
				<input class="input" v-if="isEditing" v-model="email"
					:placeholder="userStore.userInfo.email || '未填写'" />
				<view v-else>{{ userStore.userInfo.email  }}</view>
			</view>

			<!-- 校区 -->
			<view class="input-group">
				<view class="label">校区</view>
				<input class="input" v-if="isEditing" v-model="campus"
					:placeholder="userStore.userInfo.campus || '未填写'" />
				<view v-else>{{ userStore.userInfo.campus  }}</view>
			</view>
		</view>

		<!-- 保存按钮 -->
		<view class="button-container">
			<button @click="handleSave" :disabled="!isEditing" class="login-button">保存修改</button>
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
			const isEditing = ref(true); // 默认允许编辑
			const nickname = ref(userStore.userInfo.nickname || '');
			const realName = ref(userStore.userInfo.real_name || '');
			const gender = ref(userStore.userInfo.gender || '');
			const mobilePhone = ref(userStore.userInfo.mobile_phone || '');
			const birthday = ref(userStore.userInfo.birthday || '');
			const email = ref(userStore.userInfo.email || '');
			const campus = ref(userStore.userInfo.campus || '');
			const usersImage = ref(userStore.userInfo.users_image || '');

			// 头像选择
			const chooseAvatar = () => {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						const filePath = res.tempFilePaths[0];
						// 转换图片为 Base64
						uni.getFileSystemManager().readFile({
							filePath: filePath,
							encoding: 'base64',
							success: (readRes) => {
								usersImage.value = 'data:image/png;base64,' + readRes.data;
							},
						});
					},
				});
			};

			// 保存修改
			const handleSave = async () => {
				try {
					const response = await uni.request({
						url: 'http://localhost:3000/api/updateUser',
						method: 'POST',
						data: {
							users_id: userStore.userInfo.users_id,
							nickname: nickname.value,
							real_name: realName.value,
							mobile_phone: mobilePhone.value,
							gender: gender.value,
							birthday: birthday.value,
							email: email.value,
							campus: campus.value,
							users_image: usersImage.value,
						},
					});

					console.log("response", response); // 打印响应内容，检查完整数据

					// 确认返回的数据格式
					if (response.statusCode === 200) {
						uni.showToast({
							title: response.data.msg || '用户信息修改成功',
							icon: 'success',
							duration: 2000,
						});
						uni.navigateBack({
							delta: 1 // delta 表示返回的页面数，默认为 1，表示返回上一页
						});
						// 更新后重新获取用户信息
						await refreshUserInfo();

					} else {
						uni.showToast({
							title: response.data.msg || '修改失败，请检查日期格式',
							icon: 'none',
							duration: 2000,
						});
					}
				} catch (error) {
					console.error('更新用户信息错误:', error);
					uni.showToast({
						title: '网络错误，请稍后再试。',
						icon: 'none',
						duration: 2000,
					});
				}
			};

			// 重新获取用户信息并更新 userStore
			const refreshUserInfo = async () => {
				try {
					const response = await uni.request({
						url: 'http://localhost:3000/api/getUserInfo',
						method: 'GET',
						data: {
							mobile_phone: userStore.userInfo.mobile_phone, // 使用用户的手机号获取信息
						},
					});
					console.log("refreshUserInfo response", response);

					if (response.statusCode === 200) {
						const userInfo = response.data.data.userInfo;
						userStore.userInfo = {
							...userStore.userInfo,
							...userInfo,
							birthday: formatDate(userInfo.birthday), // 格式化生日
						}; // 更新 userStore 数据
					} else {
						uni.showToast({
							title: '获取用户信息失败',
							icon: 'none',
							duration: 2000,
						});
					}
				} catch (error) {
					console.error('获取用户信息错误:', error);
					uni.showToast({
						title: '网络错误，请稍后再试。',
						icon: 'none',
						duration: 2000,
					});
				}
			};

			const formatDate = (dateString) => {
				if (!dateString) return '未填写'; // 如果没有日期数据，返回 '未填写'

				const date = new Date(dateString);
				const year = date.getFullYear();
				const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 保证两位数
				const day = date.getDate().toString().padStart(2, '0'); // 保证两位数

				return `${year}-${month}-${day}`;
			};

			// // 退出登录

			// 检查登录状态
			onMounted(async () => {
				console.log('userStore.userInfo:', userStore.userInfo);
				if (!userStore.loginStatus) {
					uni.navigateTo({
						url: '/pages/login/login',
					});
					uni.showToast({
						title: '请先登录！',
						icon: 'none',
						duration: 2000,
					});
					return;
				}

				try {
					const response = await uni.request({
						url: 'http://localhost:3000/api/getUserInfo', // 替换为实际接口
						method: 'GET',
						data: {
							mobile_phone: userStore.userInfo.mobile_phone, // 根据当前登录用户的 ID 获取信息
						},
					});
					console.log("response.statusCode", response.statusCode);
					console.log("response.data.success", response.data);
					if (response.statusCode === 200) {
						const userInfo = response.data.data.userInfo;
						userStore.userInfo = {
							...userStore.userInfo,
							...userInfo,
							birthday: formatDate(userInfo.birthday), // 格式化生日
						}; // 更新 userStore
					} else {
						uni.showToast({
							title: '获取用户信息失败',
							icon: 'none',
							duration: 2000,
						});
					}
				} catch (error) {
					console.error('获取用户信息错误:', error);
					uni.showToast({
						title: '网络错误，请稍后再试。',
						icon: 'none',
						duration: 2000,
					});
				}
			});


			return {
				userStore,
				isEditing,
				nickname,
				realName,
				gender,
				mobilePhone,
				birthday,
				email,
				campus,
				usersImage,
				chooseAvatar,
				handleSave,
			};
		},
	};
</script>

<style scoped>
	.user-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding: 20px;
	}

	.avatar-upload {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		background-color: #f0f0f0;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		margin: 20px;
	}

	.avatar-preview {
		width: 100px;
		height: 100px;
		object-fit: cover;
	}

	.upload-placeholder {
		font-size: 16px;
		color: #999;
		margin-left: 50rpx;
	}

	.input-group {
		display: flex;
		align-items: center;
		width: 90%;
		margin: 10px 0;
	}

	.label {
		width: 30%;
		font-size: 16px;
		font-weight: bold;
		text-align: left;
		margin-left: 40rpx;
	}

	.input {
		flex: 1;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
		width: 500rpx;
	}

	.button-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 20px;
	}

	.login-button {
		width: 70%;
		height: 45px;
		background-color: #4ac8bd;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 16px;
		margin: 10px 0;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.login-button:disabled {
		background-color: #ccc;
	}
</style>