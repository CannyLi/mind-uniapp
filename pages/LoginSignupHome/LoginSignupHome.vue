<template>
  <view class="container">
	<image class="top-image" src="../../static/images/Swiper/swiper1.jpg" mode="aspectFill"></image>
    <view class="button-container">
      <button class="login-btn" @click="goToLogin">Login</button>
      <button class="signup-btn" @click="goToSignup">Sign up</button>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      uni.navigateTo({
        url: '/pages/login/login'
      });
    },
    goToSignup() {
      uni.navigateTo({
        url: '/pages/signup/signup'
      });
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 页面高度设置为视窗高度 */
  background-color: #4ac8bd; /* 页面背景颜色 */
  overflow: hidden;/* 防止页面滑动 */
}
.top-image {
  position: absolute; 
  height: 100vh; 
  width: 1000rpx;
  opacity: 0.6; /* 设置透明度 */
}
.button-container {
  display: flex;
  flex-direction: column; /* 将按钮上下排列 */
  align-items: center;
  width: 100%;
  padding: 800rpx 0; 
}
.login-btn, .signup-btn {
  width: 80%; 
  max-width: 500rpx; 
  height: 100rpx; 
  line-height: 100rpx; /* 让文字在按钮内垂直居中 */
  text-align: center;
  font-size: 32rpx;
  border-radius: 8rpx; /* 圆角样式 */
  margin-bottom: 20rpx; /* 按钮之间的间距 */
}
.login-btn {
  background-color: transparent; /* 背景透明 */
  border: 2rpx solid white; 
  color: white; 
}
.signup-btn {
  background-color: white; 
  border: 2rpx solid none;
  color: #4ac8bd; 
}
</style>
