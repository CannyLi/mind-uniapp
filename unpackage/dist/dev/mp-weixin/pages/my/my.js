"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    goToLoginSignupHome() {
      common_vendor.index.navigateTo({
        url: "/pages/LoginSignupHome/LoginSignupHome"
      });
    }
  },
  computed: {
    ...common_vendor.mapState("users", {
      // 从state中拿到数据
      loginStatus: (state) => state.loginStatus,
      userInfo: (state) => state.userInfo
      // token: state => state.token
    })
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.loginStatus ? _ctx.userInfo.users_image : "../../static/images/Swiper/swiper1.jpg",
    b: common_vendor.t(_ctx.loginStatus ? _ctx.userInfo.nickname : "用户名称"),
    c: common_vendor.o((...args) => $options.goToLoginSignupHome && $options.goToLoginSignupHome(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2f1ef635"]]);
wx.createPage(MiniProgramPage);
