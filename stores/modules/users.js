// stores/modules/users.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('users', {
  state: () => ({
    loginStatus: false,
    token: null,
    userInfo: {}
  }),
  actions: {
	initUser() {
	    let userInfo = uni.getStorageSync('userInfo');
	    if (userInfo) {
	        try {
	            userInfo = JSON.parse(userInfo);
	            this.$patch({ 
	                userInfo: userInfo, 
	                loginStatus: true, 
	                token: userInfo.token 
	            });
	            console.log('User is logged in:', userInfo); // 调试信息
	        } catch (error) {
	            console.error('Failed to parse userInfo:', error);
	        }
	    } else {
	        console.log('No user info found. User is not logged in.'); // 调试信息
	    }
	},

	//登录方法
    login(userInfo) {
	  // 清除上一次的用户数据
	  this.userInfo = {};
	  this.loginStatus = false;
	  this.token = null;
		
	  // 更新为新的用户数据
      this.userInfo = userInfo.userInfo;
      this.loginStatus = true;
      this.token = userInfo.token;
      // 持久化存储 -> 把对象转换成字符串
      uni.setStorageSync('userInfo', JSON.stringify(userInfo));
    },
	
	//退出登录
	logout() {
	    this.userInfo = {};
	    this.loginStatus = false;
	    this.token = null;
	    // 清除本地存储
	    uni.removeStorageSync('userInfo');
	    console.log('User logged out'); // 调试信息
	}
  }
});
