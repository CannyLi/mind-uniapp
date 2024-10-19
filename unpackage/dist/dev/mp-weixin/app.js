"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const stores_index = require("./stores/index.js");
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
  "./pages/login/login.js";
  "./pages/signup/signup.js";
  "./pages/LoginSignupHome/LoginSignupHome.js";
}
const _sfc_main = {
  onLaunch: function() {
    this.$store.commit("initUser");
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
  app.use(stores_index.store);
  app.use(common_vendor.index$1);
  return { app };
}
createApp().app.mount("#app");
exports.createApp = createApp;
