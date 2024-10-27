<template>
  <view class="container">
    <!-- 用户信息 -->
    <view class="user-info" @tap="goToLoginSignupHome">
	<!-- loginStatus为真且userInfo.users_image存在，则显示userInfo.users_image作为头像 -->
      <image class="avatar" :src="loginStatus && userInfo.users_image ? userInfo.users_image : '../../static/images/Swiper/swiper1.jpg'" mode="aspectFill"></image>
      <view class="user-details">
        <text class="nickname">{{ loginStatus && userInfo.nickname ? userInfo.nickname : "用户登录" }}</text>
      </view>
    </view>

    <!-- 设置 -->
    <navigator class="settings-section" url="/pages/my/components/settings">
      <view class="settings-item">
		<img src="@/static/images/settings.png" class="icon" />
        <text>设置</text>
      </view>
    </navigator>

    <!-- 我的预约 -->
    <navigator class="section" url="/pages/my/components/MyAppointment">
      <view class="item">
		<img src="@/static/images/appointment.png" class="icon" />
        <text>我的预约</text>
      </view>
    </navigator>

    <!-- 我的发布 -->
    <navigator class="section" url="/pages/my/components/MyRelease">
      <view class="item">
		<img src="@/static/images/myrelease.png" class="icon" />
        <text>我的发布</text>
      </view>
    </navigator>

    <!-- 我的收藏 -->
    <navigator class="section" url="/pages/my/components/Favorites">
      <view class="item">
		<img src="@/static/images/myfavorites.png" class="icon" />
        <text>我的收藏</text>
      </view>
    </navigator>

    <!-- 意见反馈 -->
    <navigator class="section" url="/pages/my/components/FeedBack">
      <view class="item">
		<img src="@/static/images/feedback.png" class="icon" />
        <text>意见反馈</text>
      </view>
    </navigator>
  </view>
</template>

<script>
import { useUserStore } from '@/stores/modules/users'; // 导入 Pinia store

export default {
  setup() {
    const userStore = useUserStore(); // 使用 Pinia store
    return { userStore };
  },
  computed: {
    loginStatus() {
      return this.userStore.loginStatus; // 从 Pinia store 获取状态
    },
    userInfo() {
      return this.userStore.userInfo; // 从 Pinia store 获取用户信息
    }
  },
  methods: {
    goToLoginSignupHome() {
      uni.navigateTo({ url: '/pages/LoginSignupHome/LoginSignupHome' });
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
}

.user-details {
  flex: 1;
}

.nickname {
  font-size: 32rpx;
  font-weight: bold;
}

.icon{
	height: 50rpx;
	width: 50rpx;
	text-align: left;
	margin-right: 0rpx;
}

.settings-section, .section {
  margin-top: 20rpx;
}

.item, .settings-item {
  padding: 20rpx;
  background-color: #fff;
  display: flex;
}
</style>
