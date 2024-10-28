"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_modules_users = require("../../stores/modules/users.js");
const _sfc_main = {
  data() {
    return {
      tag: "",
      posts_content: ""
    };
  },
  setup() {
    const userStore = stores_modules_users.useUserStore();
    userStore.initUser();
    return { userStore };
  },
  methods: {
    submitPost() {
      const date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      common_vendor.index.request({
        url: "http://localhost:3000/api/posts",
        method: "POST",
        data: {
          date,
          tag: this.tag,
          posts_content: this.posts_content,
          users_id
        },
        success: (res) => {
          if (res.data.success === "0") {
            common_vendor.index.showToast({
              title: "发布成功",
              icon: "success"
            });
            this.tag = "";
            this.posts_content = "";
            setTimeout(() => {
              common_vendor.index.switchTab({
                url: "/pages/treehole/treehole"
              });
            }, 1e3);
          } else {
            common_vendor.index.showToast({
              title: res.data.msg,
              icon: "none"
            });
          }
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "网络错误",
            icon: "none"
          });
        }
      });
    }
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
    a: $data.tag,
    b: common_vendor.o(($event) => $data.tag = $event.detail.value),
    c: $data.posts_content,
    d: common_vendor.o(($event) => $data.posts_content = $event.detail.value),
    e: common_vendor.o((...args) => $options.submitPost && $options.submitPost(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-53c25809"]]);
wx.createPage(MiniProgramPage);
