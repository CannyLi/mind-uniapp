"use strict";
const stores_modules_users = require("./modules/users.js");
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  modules: {
    // 模块
    users: stores_modules_users.users
  }
});
exports.store = store;
