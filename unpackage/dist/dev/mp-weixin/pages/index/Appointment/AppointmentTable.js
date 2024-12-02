"use strict";
const common_vendor = require("../../../common/vendor.js");
const stores_modules_userStore = require("../../../stores/modules/userStore.js");
const _sfc_main = {
  setup() {
    const userStore = stores_modules_userStore.useUserStore();
    userStore.initUser();
    return {
      userStore
    };
  },
  data() {
    return {
      appointment: {
        user_real_name: "",
        user_mobile_phone: "",
        studentId: "",
        college: "",
        campus: "",
        appointmentDate: "",
        doctorIndex: 0,
        consultIntentionIndex: 0
      },
      doctors: [],
      consultIntentions: ["心理咨询", "职业规划", "健康咨询"]
    };
  },
  mounted() {
    this.fetchDoctors();
  },
  methods: {
    fetchDoctors() {
      common_vendor.index.request({
        url: "http://localhost:3000/api/doctors",
        method: "GET",
        success: (response) => {
          if (response.data.success === "0") {
            this.doctors = response.data.data.map((doctor) => doctor.name);
          } else {
            common_vendor.index.showToast({
              title: "获取医生列表失败",
              icon: "none"
            });
          }
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "请求失败，请重试",
            icon: "none"
          });
        }
      });
    },
    submitAppointment() {
      const appointmentData = {
        user_real_name: this.appointment.user_real_name,
        user_mobile_phone: this.appointment.user_mobile_phone,
        studentId: this.appointment.studentId,
        college: this.appointment.college,
        campus: this.appointment.campus,
        appointmentDate: this.appointment.appointmentDate,
        consultIntention: this.consultIntentions[this.appointment.consultIntentionIndex]
      };
      console.log("提交的预约数据:", appointmentData);
      common_vendor.index.request({
        url: "http://localhost:3000/api/appointments",
        method: "POST",
        data: {
          users_id: this.userStore.userInfo.users_id,
          // 直接传递 users_id
          ...appointmentData
          // 展开传递预约数据
        },
        success: (response) => {
          console.log("请求成功:", response);
          common_vendor.index.showToast({
            title: response.data.message || "预约成功",
            icon: "success"
          });
          common_vendor.index.navigateBack({
            delta: 1
            // delta 表示返回的页面数，默认为 1，表示返回上一页
          });
        },
        fail: (error) => {
          console.error("请求失败:", error);
          common_vendor.index.showToast({
            title: error.message || "预约失败",
            icon: "none"
          });
          console.error(error);
        }
      });
    },
    formReset() {
      this.appointment = {
        user_real_name: "",
        user_mobile_phone: "",
        studentId: "",
        college: "",
        campus: "",
        appointmentDate: "",
        doctorIndex: 0,
        consultIntentionIndex: 0
      };
    },
    onDateChange(e) {
      this.appointment.appointmentDate = e.detail.value;
    },
    onDoctorChange(e) {
      this.appointment.doctorIndex = e.detail.value;
    },
    onConsultIntentionChange(e) {
      this.appointment.consultIntentionIndex = e.detail.value;
    }
  },
  onLoad() {
    if (!this.userStore.loginStatus) {
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
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.appointment.user_real_name,
    b: common_vendor.o(($event) => $data.appointment.user_real_name = $event.detail.value),
    c: $data.appointment.user_mobile_phone,
    d: common_vendor.o(($event) => $data.appointment.user_mobile_phone = $event.detail.value),
    e: $data.appointment.studentId,
    f: common_vendor.o(($event) => $data.appointment.studentId = $event.detail.value),
    g: $data.appointment.college,
    h: common_vendor.o(($event) => $data.appointment.college = $event.detail.value),
    i: $data.appointment.campus,
    j: common_vendor.o(($event) => $data.appointment.campus = $event.detail.value),
    k: common_vendor.t($data.appointment.appointmentDate || "选择预约时间"),
    l: common_vendor.o((...args) => $options.onDateChange && $options.onDateChange(...args)),
    m: common_vendor.t($data.doctors[$data.appointment.doctorIndex] || "选择医师"),
    n: $data.doctors,
    o: common_vendor.o((...args) => $options.onDoctorChange && $options.onDoctorChange(...args)),
    p: common_vendor.t($data.consultIntentions[$data.appointment.consultIntentionIndex] || "选择咨询意向"),
    q: $data.consultIntentions,
    r: common_vendor.o((...args) => $options.onConsultIntentionChange && $options.onConsultIntentionChange(...args)),
    s: common_vendor.o((...args) => $options.submitAppointment && $options.submitAppointment(...args)),
    t: common_vendor.o((...args) => $options.formReset && $options.formReset(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3aff1a6e"]]);
wx.createPage(MiniProgramPage);
