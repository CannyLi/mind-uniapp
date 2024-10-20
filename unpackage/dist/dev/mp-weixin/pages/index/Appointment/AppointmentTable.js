"use strict";
const common_vendor = require("../../../common/vendor.js");
const stores_modules_users = require("../../../stores/modules/users.js");
const _sfc_main = {
  data() {
    return {
      appointment: {
        name: "",
        phone: "",
        studentId: "",
        college: "",
        campus: "",
        date: "",
        doctorIndex: 0,
        consultIntentionIndex: 0
      },
      doctors: ["医师A", "医师B", "医师C"],
      consultIntentions: ["心理咨询", "职业规划", "健康咨询"]
    };
  },
  methods: {
    submitAppointment() {
      console.log("预约信息:", this.appointment);
      common_vendor.index.showToast({
        title: "预约提交成功",
        icon: "success",
        duration: 2e3
      });
    },
    onDateChange(e) {
      this.appointment.date = e.detail.value;
    },
    onDoctorChange(e) {
      this.appointment.doctorIndex = e.detail.value;
    },
    onConsultIntentionChange(e) {
      this.appointment.consultIntentionIndex = e.detail.value;
    }
  },
  setup() {
    const userStore = stores_modules_users.useUserStore();
    userStore.initUser();
    return {
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
    a: $data.appointment.name,
    b: common_vendor.o(($event) => $data.appointment.name = $event.detail.value),
    c: $data.appointment.phone,
    d: common_vendor.o(($event) => $data.appointment.phone = $event.detail.value),
    e: $data.appointment.studentId,
    f: common_vendor.o(($event) => $data.appointment.studentId = $event.detail.value),
    g: $data.appointment.college,
    h: common_vendor.o(($event) => $data.appointment.college = $event.detail.value),
    i: $data.appointment.campus,
    j: common_vendor.o(($event) => $data.appointment.campus = $event.detail.value),
    k: common_vendor.t($data.appointment.date || "选择预约时间"),
    l: common_vendor.o((...args) => $options.onDateChange && $options.onDateChange(...args)),
    m: common_vendor.t($data.doctors[$data.appointment.doctorIndex] || "选择预约医师"),
    n: $data.doctors,
    o: common_vendor.o((...args) => $options.onDoctorChange && $options.onDoctorChange(...args)),
    p: common_vendor.t($data.consultIntentions[$data.appointment.consultIntentionIndex] || "咨询意向"),
    q: $data.consultIntentions,
    r: common_vendor.o((...args) => $options.onConsultIntentionChange && $options.onConsultIntentionChange(...args)),
    s: common_vendor.o((...args) => $options.submitAppointment && $options.submitAppointment(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3aff1a6e"]]);
wx.createPage(MiniProgramPage);
