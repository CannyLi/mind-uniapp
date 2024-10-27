"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_modules_users = require("../../stores/modules/users.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {};
  },
  setup() {
    const userStore = stores_modules_users.useUserStore();
    userStore.initUser();
    return {
      userStore
    };
  },
  components: {},
  methods: {},
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
    a: common_assets._imports_0,
    b: common_assets._imports_0
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2b7b037f"]]);
wx.createPage(MiniProgramPage);
