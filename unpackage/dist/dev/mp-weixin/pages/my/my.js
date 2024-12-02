"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_modules_userStore = require("../../stores/modules/userStore.js");
const _sfc_main = {
  setup() {
    const userStore = stores_modules_userStore.useUserStore();
    userStore.initUser();
    return {
      userStore
    };
  },
  computed: {
    loginStatus() {
      return this.userStore.loginStatus;
    },
    userInfo() {
      return this.userStore.userInfo;
    }
  },
  methods: {
    // 退出登录
    handleLogout() {
      this.userStore.logout();
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    },
    goToLogin() {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.loginStatus && $options.userInfo.users_image,
    b: $options.loginStatus
  }, $options.loginStatus ? {
    c: common_vendor.t($options.loginStatus && $options.userInfo.nickname)
  } : {
    d: common_vendor.o((...args) => $options.goToLogin && $options.goToLogin(...args))
  }, {
    e: common_vendor.o(($event) => $options.handleLogout())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2f1ef635"]]);
wx.createPage(MiniProgramPage);
