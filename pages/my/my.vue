<template>
  <view class="container">
    <!-- 用户信息 -->
    <view class="user-info" @tap="goToLoginSignupHome">
	<!-- loginStatus为真且userInfo.users_image存在，则显示userInfo.users_image作为头像 -->
      <image class="avatar" :src="loginStatus && userInfo.users_image ? userInfo.users_image : '../../static/images/Swiper/swiper1.jpg'" mode="aspectFill"></image>
      <view class="user-details">
        <view class="nickname">{{ loginStatus && userInfo.nickname ? userInfo.nickname : "用户登录" }}</view>
      </view>
    </view>

    <!-- 设置 -->
    <navigator class="section" url="/pages/my/components/settings">
      <view class="item">
		<view class="iconfont icon-shezhi icon"></view>
        <view class="text">设置</view>
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
    <navigator class="section" url="/pages/my/components/Favorites">
      <view class="item">
		<view class="iconfont icon-a-shoucangyishoucang1x1 icon"></view>
        <view class="text">我的收藏</view>
		<view class="iconfont icon-youjiantou"></view>
      </view>
    </navigator>

    <!-- 意见反馈 -->
    <navigator class="section" url="/pages/my/components/FeedBack">
      <view class="item">
		<view class="iconfont icon-yijianfankui icon"></view>
        <view class="text">意见反馈</view>
		<view class="iconfont icon-youjiantou"></view>
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
  font-size: 40rpx;
  font-weight: bold;
  text-align: center;
  margin-top: 45rpx;
  margin-bottom: 40rpx;
}

.section {
  margin-top: 20rpx;
}

.item{
  padding: 20rpx;
  padding-bottom: 40rpx;
  background-color: #fff;
  display: flex;
  border-bottom: 1px solid #e6e6e6; 
}

.icon{
	flex:1;
	font-size: 35rpx;
	height: 60rpx;
	width: 60rpx;
	text-align: left;
	margin-right: 0rpx;
	color: #4ac8bd;
}
.text{
	flex:7;
	font-size: 35rpx;
}

</style>
