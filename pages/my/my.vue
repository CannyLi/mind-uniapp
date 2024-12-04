<template>
	<view class="container">
		<!-- 用户信息 -->
		<view class="user-info">
			<image class="avatar" v-if="loginStatus && userInfo && userInfo.users_image" :src="userInfo.users_image"
				mode="aspectFill"></image>
			<view class="user-details">
				<!-- 确保 userInfo 存在且有 nickname 时才显示昵称 -->
				<view v-if="loginStatus && userInfo && userInfo.nickname" class="nickname">{{ userInfo.nickname }}</view>
				<view v-else class="nickname" @tap="goToLogin">未登录，点击登录 </view>
			</view>
		</view>

		<!-- 设置 -->
		<navigator class="section" url="/pages/my/components/settings">
			<view class="item">
				<view class="iconfont icon-shezhi icon"></view>
				<view class="text">编辑资料</view>
				<view class="iconfont icon-youjiantou"></view>
			</view>
		</navigator>

		<!-- 我的预约 -->
		<navigator class="section" url="/pages/my/components/MyAppointment">
			<view class="item">
				<view class="iconfont icon-yuyuexinxi icon"></view>
				<view class="text">我的预约</view>
				<view class="iconfont icon-youjiantou"></view>
			</view>
		</navigator>

		<!-- 我的发布 -->
		<navigator class="section" url="/pages/my/components/MyRelease">
			<view class="item">
				<view class="iconfont icon-fabu icon"></view>
				<view class="text">我的发布</view>
				<view class="iconfont icon-youjiantou"></view>
			</view>
		</navigator>

		<!-- 我的收藏 -->
		<!--    <navigator class="section">
      <view class="item">
		<view class="iconfont icon-a-shoucangyishoucang1x1 icon"></view>
        <view class="text">我的收藏</view>
		<view class="iconfont icon-youjiantou"></view>
      </view>
    </navigator> -->

		<!-- 意见反馈 -->
		<navigator class="section" url="/pages/my/components/FeedBack">
			<view class="item">
				<view class="iconfont icon-yijianfankui icon"></view>
				<view class="text">意见反馈</view>
				<view class="iconfont icon-youjiantou"></view>
			</view>
		</navigator>

		<!-- 退出登录 -->
		<view class="section" @click="handleLogout()">
			<view class="item">
				<view class="iconfont icon-a-shoucangyishoucang1x1 icon"></view>
				<view class="text">退出登录</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		useUserStore
	} from '@/stores/modules/userStore.js'; // 导入 Pinia store

	export default {
		setup() {
			const userStore = useUserStore(); // 使用 Pinia store
			// 初始化用户信息
			userStore.initUser();

			return {
				userStore,
				loginStatus: userStore.loginStatus,
				userInfo: userStore.userInfo,
			};
		},
		computed: {
			loginStatus() {
				return this.userStore.loginStatus; // 从Pinia store获取状态
			},
			userInfo() {
				return this.userStore.userInfo; // 从Pinia store获取用户信息
			}
		},
		methods: {
			// 退出登录
			handleLogout() {
				this.userStore.logout();
				uni.redirectTo({
					url: '/pages/login/login',
				});
			},
			goToLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			}
		}
	};
</script>

<style scoped>
	.container {
		padding: 20rpx;
	}

	.user-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 20rpx;
		background-color: #fff;
	}

	.avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin-right: 20rpx;
		background-color: darkgrey;
	}

	.user-details {
		flex: 1;
	}

	.nickname {
		font-size: 40rpx;
		font-weight: bold;
		text-align: center;
		margin-top: 45rpx;
		margin-bottom: 40rpx;
		margin-left: -20rpx;
	}

	.section {
		margin-top: 20rpx;
	}

	.item {
		padding: 20rpx;
		padding-bottom: 40rpx;
		background-color: #fff;
		display: flex;
		border-bottom: 1px solid #e6e6e6;
	}

	.icon {
		flex: 1;
		font-size: 35rpx;
		height: 60rpx;
		width: 60rpx;
		text-align: left;
		margin-right: 0rpx;
		color: #4ac8bd;
	}

	.text {
		flex: 7;
		font-size: 35rpx;
	}
</style>