"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_modules_users = require("../../stores/modules/users.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      username: "",
      password: "",
      rules: {
        username: {
          rule: /\S+/,
          msg: "账号不能为空！"
        },
        password: {
          rule: /^[0-9a-zA-Z]{6,16}$/,
          msg: "密码应该为6-16位字符"
        }
      }
    };
  },
  setup() {
    const userStore = stores_modules_users.useUserStore();
    return { userStore };
  },
  methods: {
    handleLogin() {
      if (!this.validate("username"))
        return;
      if (!this.validate("password"))
        return;
      common_vendor.index.showLoading({
        title: "登录中..."
      });
      common_vendor.index.request({
        url: "http://localhost:3000/api/login",
        method: "POST",
        data: {
          username: this.username,
          password: this.password
        }
      }).then((res) => {
        common_vendor.index.hideLoading();
        console.log(res);
        if (res.data.data.success) {
          const userInfo = {
            nickname: res.data.data.data.nickname,
            users_image: res.data.data.data.users_image
          };
          const token = res.data.data.token;
          this.userStore.login({ userInfo, token });
          common_vendor.index.showToast({
            title: res.data.data.msg,
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.navigateBack({ delta: 2 });
          }, 1e3);
        } else {
          common_vendor.index.showToast({
            title: res.data.data.msg,
            icon: "none"
          });
        }
      }).catch(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "请求失败",
          icon: "none"
        });
      });
    },
    validate(key) {
      let isValid = true;
      if (!this.rules[key].rule.test(this[key])) {
        common_vendor.index.showToast({
          title: this.rules[key].msg,
          icon: "none"
        });
        isValid = false;
      }
      return isValid;
    },
    handleWeChatLogin() {
      console.log("Login with WeChat");
      common_vendor.index.switchTab({ url: "/pages/index/index" });
    },
    sendSMS() {
      console.log(`Sending SMS to the registered phone number for ${this.username}`);
      common_vendor.index.showToast({
        title: "SMS sent!",
        icon: "success",
        duration: 2e3
      });
    },
    goToSignup() {
      common_vendor.index.navigateTo({ url: "/pages/signup/signup" });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.username,
    b: common_vendor.o(($event) => $data.username = $event.detail.value),
    c: $data.password,
    d: common_vendor.o(($event) => $data.password = $event.detail.value),
    e: common_vendor.o((...args) => $options.sendSMS && $options.sendSMS(...args)),
    f: common_vendor.o((...args) => $options.goToSignup && $options.goToSignup(...args)),
    g: common_vendor.o((...args) => $options.handleLogin && $options.handleLogin(...args)),
    h: common_vendor.o((...args) => $options.handleWeChatLogin && $options.handleWeChatLogin(...args)),
    i: common_assets._imports_0
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
