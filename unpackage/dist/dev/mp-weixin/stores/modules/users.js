"use strict";
const common_vendor = require("../../common/vendor.js");
const users = {
  namespaced: true,
  state: {
    //登录状态
    loginStatus: false,
    //token
    token: null,
    //用户信息（nickname, users_image）
    userInfo: {}
  },
  getters: {},
  mutations: {
    //一旦进入app，就需要执行这个方法，把用户信息读出来
    initUser(state) {
      let userInfo = common_vendor.index.getStorageInfoSync("userInfo");
      if (userInfo) {
        userInfo = JSON.parse(userInfo);
        state.userInfo = userInfo;
        state.loginStatus = true;
        state.token = userInfo.token;
      }
    },
    // 登录后保存用户信息
    login(state, userInfo) {
      console.log("Updating user info:", userInfo);
      state.userInfo = userInfo.userInfo;
      state.loginStatus = true;
      state.token = userInfo.token;
      common_vendor.index.setStorageSync("userInfo", JSON.stringify(userInfo));
    }
  },
  action: {}
};
exports.users = users;
