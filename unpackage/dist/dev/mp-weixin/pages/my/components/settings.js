"use strict";
const common_vendor = require("../../../common/vendor.js");
const stores_modules_userStore = require("../../../stores/modules/userStore.js");
const _sfc_main = {
  setup() {
    const userStore = stores_modules_userStore.useUserStore();
    const isEditing = common_vendor.ref(true);
    const nickname = common_vendor.ref(userStore.userInfo.nickname || "");
    const realName = common_vendor.ref(userStore.userInfo.real_name || "");
    const gender = common_vendor.ref(userStore.userInfo.gender || "");
    const mobilePhone = common_vendor.ref(userStore.userInfo.mobile_phone || "");
    const birthday = common_vendor.ref(userStore.userInfo.birthday || "");
    const email = common_vendor.ref(userStore.userInfo.email || "");
    const campus = common_vendor.ref(userStore.userInfo.campus || "");
    const usersImage = common_vendor.ref(userStore.userInfo.users_image || "");
    const chooseAvatar = () => {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          const filePath = res.tempFilePaths[0];
          common_vendor.index.getFileSystemManager().readFile({
            filePath,
            encoding: "base64",
            success: (readRes) => {
              usersImage.value = "data:image/png;base64," + readRes.data;
            }
          });
        }
      });
    };
    const handleSave = async () => {
      try {
        const response = await common_vendor.index.request({
          url: "http://localhost:3000/api/updateUser",
          method: "POST",
          data: {
            users_id: userStore.userInfo.users_id,
            nickname: nickname.value,
            real_name: realName.value,
            mobile_phone: mobilePhone.value,
            gender: gender.value,
            birthday: birthday.value,
            email: email.value,
            campus: campus.value,
            users_image: usersImage.value
          }
        });
        console.log("response", response);
        if (response.statusCode === 200) {
          common_vendor.index.showToast({
            title: response.data.msg || "用户信息修改成功",
            icon: "success",
            duration: 2e3
          });
          common_vendor.index.navigateBack({
            delta: 1
            // delta 表示返回的页面数，默认为 1，表示返回上一页
          });
          await refreshUserInfo();
        } else {
          common_vendor.index.showToast({
            title: response.data.msg || "修改失败，请检查日期格式",
            icon: "none",
            duration: 2e3
          });
        }
      } catch (error) {
        console.error("更新用户信息错误:", error);
        common_vendor.index.showToast({
          title: "网络错误，请稍后再试。",
          icon: "none",
          duration: 2e3
        });
      }
    };
    const refreshUserInfo = async () => {
      try {
        const response = await common_vendor.index.request({
          url: "http://localhost:3000/api/getUserInfo",
          method: "GET",
          data: {
            mobile_phone: userStore.userInfo.mobile_phone
            // 使用用户的手机号获取信息
          }
        });
        console.log("refreshUserInfo response", response);
        if (response.statusCode === 200) {
          const userInfo = response.data.data.userInfo;
          userStore.userInfo = {
            ...userStore.userInfo,
            ...userInfo,
            birthday: formatDate(userInfo.birthday)
            // 格式化生日
          };
        } else {
          common_vendor.index.showToast({
            title: "获取用户信息失败",
            icon: "none",
            duration: 2e3
          });
        }
      } catch (error) {
        console.error("获取用户信息错误:", error);
        common_vendor.index.showToast({
          title: "网络错误，请稍后再试。",
          icon: "none",
          duration: 2e3
        });
      }
    };
    const formatDate = (dateString) => {
      if (!dateString)
        return "未填写";
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    common_vendor.onMounted(async () => {
      console.log("userStore.userInfo:", userStore.userInfo);
      if (!userStore.loginStatus) {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
        common_vendor.index.showToast({
          title: "请先登录！",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      try {
        const response = await common_vendor.index.request({
          url: "http://localhost:3000/api/getUserInfo",
          // 替换为实际接口
          method: "GET",
          data: {
            mobile_phone: userStore.userInfo.mobile_phone
            // 根据当前登录用户的 ID 获取信息
          }
        });
        console.log("response.statusCode", response.statusCode);
        console.log("response.data.success", response.data);
        if (response.statusCode === 200) {
          const userInfo = response.data.data.userInfo;
          userStore.userInfo = {
            ...userStore.userInfo,
            ...userInfo,
            birthday: formatDate(userInfo.birthday)
            // 格式化生日
          };
        } else {
          common_vendor.index.showToast({
            title: "获取用户信息失败",
            icon: "none",
            duration: 2e3
          });
        }
      } catch (error) {
        console.error("获取用户信息错误:", error);
        common_vendor.index.showToast({
          title: "网络错误，请稍后再试。",
          icon: "none",
          duration: 2e3
        });
      }
    });
    return {
      userStore,
      isEditing,
      nickname,
      realName,
      gender,
      mobilePhone,
      birthday,
      email,
      campus,
      usersImage,
      chooseAvatar,
      handleSave
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.userStore.userInfo.users_image,
    b: common_vendor.o((...args) => $setup.chooseAvatar && $setup.chooseAvatar(...args)),
    c: $setup.isEditing
  }, $setup.isEditing ? {
    d: $setup.userStore.userInfo.nickname || "未填写",
    e: $setup.nickname,
    f: common_vendor.o(($event) => $setup.nickname = $event.detail.value)
  } : {
    g: common_vendor.t($setup.userStore.userInfo.nickname)
  }, {
    h: $setup.isEditing
  }, $setup.isEditing ? {
    i: $setup.userStore.userInfo.real_name || "未填写",
    j: $setup.realName,
    k: common_vendor.o(($event) => $setup.realName = $event.detail.value)
  } : {
    l: common_vendor.t($setup.userStore.userInfo.real_name)
  }, {
    m: $setup.isEditing
  }, $setup.isEditing ? {
    n: $setup.userStore.userInfo.gender || "未填写",
    o: $setup.gender,
    p: common_vendor.o(($event) => $setup.gender = $event.detail.value)
  } : {
    q: common_vendor.t($setup.userStore.userInfo.gender)
  }, {
    r: $setup.isEditing
  }, $setup.isEditing ? {
    s: $setup.userStore.userInfo.mobile_phone || "未填写",
    t: $setup.mobilePhone,
    v: common_vendor.o(($event) => $setup.mobilePhone = $event.detail.value)
  } : {
    w: common_vendor.t($setup.userStore.userInfo.mobile_phone)
  }, {
    x: $setup.isEditing
  }, $setup.isEditing ? {
    y: $setup.userStore.userInfo.birthday || "格式必须是YY-MM-DD",
    z: $setup.birthday,
    A: common_vendor.o(($event) => $setup.birthday = $event.detail.value)
  } : {
    B: common_vendor.t($setup.userStore.userInfo.birthday)
  }, {
    C: $setup.isEditing
  }, $setup.isEditing ? {
    D: $setup.userStore.userInfo.email || "未填写",
    E: $setup.email,
    F: common_vendor.o(($event) => $setup.email = $event.detail.value)
  } : {
    G: common_vendor.t($setup.userStore.userInfo.email)
  }, {
    H: $setup.isEditing
  }, $setup.isEditing ? {
    I: $setup.userStore.userInfo.campus || "未填写",
    J: $setup.campus,
    K: common_vendor.o(($event) => $setup.campus = $event.detail.value)
  } : {
    L: common_vendor.t($setup.userStore.userInfo.campus)
  }, {
    M: common_vendor.o((...args) => $setup.handleSave && $setup.handleSave(...args)),
    N: !$setup.isEditing
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c7527a9e"]]);
wx.createPage(MiniProgramPage);
