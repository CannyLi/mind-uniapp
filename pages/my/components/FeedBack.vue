<template>
  <view class="feedback">
    <view class="name">姓名</view>
	<view class="phone">手机号码</view>
	<view class="email">电子邮件</view>
	<view class="wechatnum">反馈的微信号</view>
	<view class="message">反馈意见内容</view>
	<view class="pictures">反馈图片</view>
  </view>
</template>

<script>
import { useUserStore } from '@/stores/modules/users';

export default {
  setup() {
    const userStore = useUserStore();
	// 初始化用户信息
	userStore.initUser();


    return {
	  userStore
    };
  },
  onLoad() {
      // 检查登录状态
      if (!this.userStore.loginStatus) {
          uni.navigateTo({
          	url: '/pages/LoginSignupHome/LoginSignupHome' // 登录页面的路径
          });
		  uni.showToast({
		  	title:'请先登录！',
			icon:'none',
			duration:2000
		  })
      }
  }
};
</script>

<style scoped>
/* 样式 */
</style>
