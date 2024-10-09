"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/index/Article/FullArticle.js";
  "./pages/index/Article/ArticleContent.js";
  "./pages/index/Doctor/AllDoctor.js";
  "./pages/index/Doctor/DoctorInfo.js";
  "./pages/index/Appointment/AppointmentTable.js";
  "./pages/my/my.js";
  "./pages/treehole/treehole.js";
  "./pages/consult/consult.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
