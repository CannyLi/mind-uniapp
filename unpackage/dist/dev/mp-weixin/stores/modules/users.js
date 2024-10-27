"use strict";
const common_vendor = require("../../common/vendor.js");
const useUserStore = common_vendor.defineStore("users", {
  state: () => ({
    loginStatus: false,
    token: null,
    userInfo: {}
  }),
  actions: {
    initUser() {
      let userInfo = common_vendor.index.getStorageSync("userInfo");
      if (userInfo) {
        try {
          userInfo = JSON.parse(userInfo);
          this.$patch({
            userInfo,
            loginStatus: true,
            token: userInfo.token
          });
          console.log("User is logged in:", userInfo);
        } catch (error) {
          console.error("Failed to parse userInfo:", error);
        }
      } else {
        console.log("No user info found. User is not logged in.");
      }
    },
    //登录方法
    login(userInfo) {
      this.userInfo = {};
      this.loginStatus = false;
      this.token = null;
      this.userInfo = userInfo.userInfo;
      this.loginStatus = true;
      this.token = userInfo.token;
      common_vendor.index.setStorageSync("userInfo", JSON.stringify(userInfo));
    },
    //退出登录
    logout(userInfo) {
      this.userInfo = {};
      this.loginStatus = false;
      this.token = null;
      common_vendor.index.removeStorageSync("userInfo");
      console.log("User logged out");
    }
  }
});
exports.useUserStore = useUserStore;
