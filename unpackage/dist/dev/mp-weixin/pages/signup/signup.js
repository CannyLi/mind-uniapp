"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      username: "",
      // 手机号
      code: "",
      // 验证码
      isCodeSent: false,
      // 控制验证码按钮状态
      countdown: 60,
      // 倒计时初始值
      timer: null
      // 定时器
    };
  },
  methods: {
    // 发送验证码
    sendCode() {
      if (!this.isValidPhone()) {
        common_vendor.index.showToast({
          title: "请输入有效的手机号",
          icon: "none"
        });
        return;
      }
      if (this.isCodeSent) {
        return;
      }
      common_vendor.index.request({
        url: "http://localhost:3000/api/code",
        method: "POST",
        data: {
          username: this.username
        },
        success: (res) => {
          if (res.data.success) {
            common_vendor.index.showToast({
              title: "验证码已发送",
              icon: "success"
            });
            this.startCountdown();
          } else {
            console.log(res);
            common_vendor.index.showToast({
              title: res.data.data.msg,
              icon: "none"
            });
          }
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "请求失败，请稍后重试",
            icon: "none"
          });
        }
      });
    },
    // 开始倒计时
    startCountdown() {
      this.isCodeSent = true;
      this.countdown = 60;
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          this.isCodeSent = false;
          clearInterval(this.timer);
        }
      }, 1e3);
    },
    // 处理注册
    handleSignup() {
      if (!this.isValidPhone() || !this.code) {
        common_vendor.index.showToast({
          title: "请输入有效的手机号和验证码",
          icon: "none"
        });
        return;
      }
      common_vendor.index.request({
        url: "http://localhost:3000/api/signup",
        method: "POST",
        data: {
          username: this.username,
          code: this.code
        },
        success: (res) => {
          if (res.data.success) {
            common_vendor.index.showToast({
              title: "注册成功",
              icon: "success"
            });
            common_vendor.index.navigateTo({
              url: "/pages/login/login"
            });
          } else {
            common_vendor.index.showToast({
              title: res.data.message || "注册失败",
              icon: "none"
            });
          }
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "请求失败，请稍后重试",
            icon: "none"
          });
        }
      });
    },
    // 校验手机号
    isValidPhone() {
      const phoneRegex = /^1[3-9]\d{9}$/;
      return phoneRegex.test(this.username);
    },
    goToLogin() {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.username,
    b: common_vendor.o(($event) => $data.username = $event.detail.value),
    c: $data.code,
    d: common_vendor.o(($event) => $data.code = $event.detail.value),
    e: common_vendor.t($data.isCodeSent ? $data.countdown + "s" : "获取验证码"),
    f: common_vendor.o((...args) => $options.sendCode && $options.sendCode(...args)),
    g: common_vendor.o((...args) => $options.handleSignup && $options.handleSignup(...args)),
    h: common_vendor.o((...args) => $options.goToLogin && $options.goToLogin(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-69533909"]]);
wx.createPage(MiniProgramPage);
