"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      doctors: []
      // 存储医生列表
    };
  },
  onLoad() {
    this.fetchDoctors();
  },
  methods: {
    fetchDoctors() {
      common_vendor.index.request({
        url: "http://localhost:3000/api/doctors",
        method: "GET",
        success: (res) => {
          console.log("Response:", res);
          if (res.data.success === "0") {
            this.doctors = res.data.data;
          } else {
            common_vendor.index.showToast({
              title: "获取医生失败",
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
    goToDoctorInfo(doctor) {
      common_vendor.index.navigateTo({
        url: `/pages/index/Doctor/DoctorInfo?doctor_id=${doctor.doctor_id}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.doctors, (doctor, k0, i0) => {
      return {
        a: doctor.doctor_image,
        b: common_vendor.t(doctor.name),
        c: common_vendor.t(doctor.introduction),
        d: common_vendor.t(doctor.expertise),
        e: doctor.doctor_id,
        f: common_vendor.o(($event) => $options.goToDoctorInfo(doctor), doctor.doctor_id)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cb1005e8"]]);
wx.createPage(MiniProgramPage);
