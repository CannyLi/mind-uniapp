"use strict";
const common_vendor = require("../../../common/vendor.js");
const stores_modules_userStore = require("../../../stores/modules/userStore.js");
const _sfc_main = {
  setup() {
    const userStore = stores_modules_userStore.useUserStore();
    userStore.initUser();
    const appointments = common_vendor.ref([]);
    const fetchAppointments = async () => {
      try {
        const response = await common_vendor.index.request({
          url: "http://localhost:3000/api/appointments/user/" + userStore.userInfo.mobile_phone,
          method: "GET"
        });
        console.log("response.data", response.data);
        if (response.statusCode === 200 && response.data.success === "0") {
          appointments.value = response.data.data;
        } else {
          common_vendor.index.showToast({
            title: "获取预约信息失败",
            icon: "none"
          });
        }
      } catch (error) {
        console.error("获取预约信息错误:", error);
        common_vendor.index.showToast({
          title: "获取预约信息失败，请稍后再试。",
          icon: "none"
        });
      }
    };
    const deleteAppointment = async (appointmentId) => {
      try {
        const response = await common_vendor.index.request({
          url: `http://localhost:3000/api/appointments/${appointmentId}`,
          method: "DELETE"
        });
        if (response.statusCode === 200 && response.data.success === "0") {
          appointments.value = appointments.value.filter((apt) => apt.appointment_id !== appointmentId);
          common_vendor.index.showToast({
            title: "预约删除成功",
            icon: "success"
          });
        } else {
          common_vendor.index.showToast({
            title: "预约删除失败",
            icon: "none"
          });
        }
      } catch (error) {
        console.error("删除预约信息错误:", error);
        common_vendor.index.showToast({
          title: "删除预约信息失败，请稍后再试。",
          icon: "none"
        });
      }
    };
    common_vendor.onMounted(() => {
      fetchAppointments();
    });
    const formatDate = (dateString) => {
      if (!dateString)
        return "未填写";
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    return {
      appointments,
      deleteAppointment,
      userStore,
      formatDate
    };
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
  return common_vendor.e({
    a: $setup.appointments.length === 0
  }, $setup.appointments.length === 0 ? {} : {
    b: common_vendor.f($setup.appointments, (appointment, index, i0) => {
      return {
        a: common_vendor.t(appointment.user_real_name),
        b: common_vendor.t(appointment.user_mobile_phone),
        c: common_vendor.t(appointment.studentId),
        d: common_vendor.t(appointment.college),
        e: common_vendor.t(appointment.campus),
        f: common_vendor.t($setup.formatDate(appointment.appointmentDate)),
        g: common_vendor.t(appointment.consultIntention),
        h: common_vendor.o(($event) => $setup.deleteAppointment(appointment.appointment_id), appointment.appointment_id),
        i: appointment.appointment_id
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5fbac27e"]]);
wx.createPage(MiniProgramPage);
