"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      doctor: {}
      // 存储医生信息
    };
  },
  onLoad() {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const doctorId = currentPage.options.doctor_id;
    this.fetchDoctorInfo(doctorId);
  },
  methods: {
    fetchDoctorInfo(doctorId) {
      common_vendor.index.request({
        url: `http://localhost:3000/api/doctors/${doctorId}`,
        method: "GET",
        success: (res) => {
          if (res.data.success === "0") {
            this.doctor = res.data.data;
          } else {
            common_vendor.index.showToast({
              title: "获取医生信息失败",
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
    goToAppointmentTable() {
      common_vendor.index.navigateTo({
        url: "/pages/index/Appointment/AppointmentTable"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.doctor.doctor_image,
    b: common_vendor.t($data.doctor.name),
    c: common_vendor.t($data.doctor.introduction),
    d: common_vendor.t($data.doctor.expertise),
    e: common_vendor.t($data.doctor.consultation_notice),
    f: common_vendor.o(($event) => $options.goToAppointmentTable())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
