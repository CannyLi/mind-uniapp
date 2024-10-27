"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_modules_users = require("../../stores/modules/users.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  setup() {
    const userStore = stores_modules_users.useUserStore();
    return { userStore };
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
    goToLoginSignupHome() {
      common_vendor.index.navigateTo({ url: "/pages/LoginSignupHome/LoginSignupHome" });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $options.loginStatus && $options.userInfo.users_image ? $options.userInfo.users_image : "../../static/images/Swiper/swiper1.jpg",
    b: common_vendor.t($options.loginStatus && $options.userInfo.nickname ? $options.userInfo.nickname : "用户登录"),
    c: common_vendor.o((...args) => $options.goToLoginSignupHome && $options.goToLoginSignupHome(...args)),
    d: common_assets._imports_0,
    e: common_assets._imports_1,
    f: common_assets._imports_2,
    g: common_assets._imports_3,
    h: common_assets._imports_4
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2f1ef635"]]);
wx.createPage(MiniProgramPage);
