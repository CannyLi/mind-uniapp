<template>
  <view class="myappointment">
    myappointment
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
