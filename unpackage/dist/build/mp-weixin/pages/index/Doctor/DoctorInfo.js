"use strict";const o=require("../../../common/vendor.js"),t={data:()=>({doctor:{}}),onLoad(){const o=getCurrentPages(),t=o[o.length-1].options.doctor_id;this.fetchDoctorInfo(t)},methods:{fetchDoctorInfo(t){o.index.request({url:`http://localhost:3000/api/doctors/${t}`,method:"GET",success:t=>{"0"===t.data.success?this.doctor=t.data.data:o.index.showToast({title:"获取医生信息失败",icon:"none"})},fail:()=>{o.index.showToast({title:"请求失败，请稍后重试",icon:"none"})}})},goToAppointmentTable(){o.index.navigateTo({url:"/pages/index/Appointment/AppointmentTable"})}}};const e=o._export_sfc(t,[["render",function(t,e,n,c,i,r){return{a:i.doctor.doctor_image,b:o.t(i.doctor.name),c:o.t(i.doctor.introduction),d:o.t(i.doctor.expertise),e:o.t(i.doctor.consultation_notice),f:o.o((o=>r.goToAppointmentTable()))}}]]);wx.createPage(e);