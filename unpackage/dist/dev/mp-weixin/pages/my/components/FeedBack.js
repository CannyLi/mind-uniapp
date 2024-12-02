"use strict";
const common_vendor = require("../../../common/vendor.js");
const stores_modules_userStore = require("../../../stores/modules/userStore.js");
const _sfc_main = {
  setup() {
    const userStore = stores_modules_userStore.useUserStore();
    userStore.initUser();
    const feedback = common_vendor.ref("");
    const maxFeedbackLength = 1e3;
    const checkLoginStatus = () => {
      if (!userStore.loginStatus) {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
          // 登录页面的路径
        });
        common_vendor.index.showToast({
          title: "请先登录！",
          icon: "none",
          duration: 2e3
        });
      }
    };
    const submitFeedback = async () => {
      if (!feedback.value.trim()) {
        common_vendor.index.showToast({
          title: "请输入反馈内容",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      try {
        const response = await common_vendor.index.request({
          url: "http://localhost:3000/api/feedback",
          method: "POST",
          data: {
            users_id: userStore.userInfo.users_id,
            // 当前登录用户的 ID
            feedback: feedback.value
          }
        });
        if (response.statusCode === 200 && response.data.success) {
          common_vendor.index.showToast({
            title: "反馈提交成功",
            icon: "success"
          });
          feedback.value = "";
          common_vendor.index.navigateBack({
            delta: 1
          });
        } else {
          common_vendor.index.showToast({
            title: "提交反馈失败",
            icon: "none"
          });
        }
      } catch (error) {
        console.error("提交反馈失败:", error);
        common_vendor.index.showToast({
          title: "提交失败，请稍后再试",
          icon: "none"
        });
      }
    };
    common_vendor.onMounted(() => {
      checkLoginStatus();
    });
    return {
      feedback,
      maxFeedbackLength,
      submitFeedback
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o([($event) => $setup.feedback = $event.detail.value, (...args) => _ctx.updateFeedbackLength && _ctx.updateFeedbackLength(...args)]),
    b: $setup.feedback,
    c: common_vendor.t($setup.feedback.length),
    d: common_vendor.o((...args) => $setup.submitFeedback && $setup.submitFeedback(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0c7fcf34"]]);
wx.createPage(MiniProgramPage);
