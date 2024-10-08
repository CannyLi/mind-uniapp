"use strict";
const common_vendor = require("./common/vendor.js");
const common_assets = require("./common/assets.js");
const _sfc_main = {
  methods: {
    goBack() {
      common_vendor.index.navigateBack({
        delta: 1
        // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_assets._imports_0
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8bd2a792"]]);
exports.MiniProgramPage = MiniProgramPage;
