"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_modules_userStore = require("../../stores/modules/userStore.js");
const _sfc_main = {
  data() {
    return {
      users_image: "",
      nickname: "",
      mobile_phone: ""
    };
  },
  setup() {
    const userStore = stores_modules_userStore.useUserStore();
    return {
      userStore
    };
  },
  methods: {
    // 选择头像
    chooseAvatar() {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          const filePath = res.tempFilePaths[0];
          common_vendor.index.getFileSystemManager().readFile({
            filePath,
            encoding: "base64",
            success: (readRes) => {
              this.users_image = "data:image/png;base64," + readRes.data;
            }
          });
        }
      });
    },
    // 保存设置
    handleSave() {
      if (!this.nickname || !this.mobile_phone) {
        common_vendor.index.showToast({
          title: "请完整填写信息！",
          icon: "none"
        });
        return;
      }
      if (!/^1[3-9]\d{9}$/.test(this.mobile_phone)) {
        common_vendor.index.showToast({
          title: "请输入有效的11位手机号",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "保存中..."
      });
      let users_image = this.users_image;
      this.saveUserInfo(users_image);
    },
    saveUserInfo(users_image) {
      common_vendor.index.request({
        url: "http://localhost:3000/api/saveUser",
        method: "POST",
        data: {
          users_image,
          // 发送 Base64 数据
          nickname: this.nickname,
          mobile_phone: this.mobile_phone
        },
        success: (res) => {
          console.log("后端响应:", res);
          common_vendor.index.hideLoading();
          if (res.data.data.success) {
            const userInfo = {
              users_image,
              nickname: this.nickname,
              mobile_phone: this.mobile_phone,
              users_id: res.data.data.userInfo.users_id
            };
            this.userStore.login(userInfo);
            common_vendor.index.showToast({
              title: "设置保存成功",
              icon: "success"
            });
            common_vendor.index.switchTab({
              url: "/pages/index/index"
            });
          } else {
            common_vendor.index.showToast({
              title: res.data.data.msg,
              icon: "none"
            });
          }
        },
        fail: (err) => {
          common_vendor.index.hideLoading();
          console.error("请求失败:", err);
          common_vendor.index.showToast({
            title: "请求失败，请稍后再试",
            icon: "none"
          });
        }
      });
    }
  },
  // 页面加载时获取用户信息
  mounted() {
    if (this.userStore.loginStatus) {
      this.users_image = this.userStore.userInfo.users_image;
      this.nickname = this.userStore.userInfo.nickname;
      this.mobile_phone = this.userStore.userInfo.mobile_phone;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.users_image
  }, $data.users_image ? {
    b: $data.users_image
  } : {}, {
    c: common_vendor.o((...args) => $options.chooseAvatar && $options.chooseAvatar(...args)),
    d: $data.nickname,
    e: common_vendor.o(($event) => $data.nickname = $event.detail.value),
    f: $data.mobile_phone,
    g: common_vendor.o(($event) => $data.mobile_phone = $event.detail.value),
    h: common_vendor.o((...args) => $options.handleSave && $options.handleSave(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
