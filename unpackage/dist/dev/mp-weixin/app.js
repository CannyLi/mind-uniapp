"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const stores_modules_users = require("./stores/modules/users.js");
const stores_index = require("./stores/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/index/Article/FullArticle.js";
  "./pages/index/Article/ArticleContent.js";
  "./pages/index/Doctor/AllDoctor.js";
  "./pages/index/Doctor/DoctorInfo.js";
  "./pages/index/Appointment/AppointmentTable.js";
  "./pages/my/my.js";
  "./pages/my/components/settings.js";
  "./pages/my/components/MyAppointment.js";
  "./pages/my/components/MyRelease.js";
  "./pages/my/components/Favorites.js";
  "./pages/my/components/FeedBack.js";
  "./pages/treehole/treehole.js";
  "./pages/consult/consult.js";
  "./pages/login/login.js";
  "./pages/signup/signup.js";
  "./pages/LoginSignupHome/LoginSignupHome.js";
}
const _sfc_main = {
  setup() {
    const userStore = stores_modules_users.useUserStore();
    userStore.initUser();
    return {};
  },
  onLaunch() {
    console.log("App Launch");
  },
  onShow() {
    console.log("App Show");
  },
  onHide() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(stores_index.pinia);
  return { app };
}
createApp().app.mount("#app");
exports.createApp = createApp;
