"use strict";
const common_vendor = require("../../../common/vendor.js");
const stores_modules_users = require("../../../stores/modules/users.js");
const _sfc_main = {
  setup() {
    const userStore = stores_modules_users.useUserStore();
    userStore.initUser();
    const handleLogout = () => {
      userStore.logout();
      common_vendor.index.redirectTo({
        url: "/pages/LoginSignupHome/LoginSignupHome"
      });
    };
    return {
      handleLogout,
      userStore
    };
  },
  onLoad() {
    if (!this.userStore.loginStatus) {
      common_vendor.index.navigateTo({
        url: "/pages/LoginSignupHome/LoginSignupHome"
        // 登录页面的路径
      });
      common_vendor.index.showToast({
        title: "请先登录！",
        icon: "none",
        duration: 2e3
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $setup.handleLogout && $setup.handleLogout(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c7527a9e"]]);
wx.createPage(MiniProgramPage);
