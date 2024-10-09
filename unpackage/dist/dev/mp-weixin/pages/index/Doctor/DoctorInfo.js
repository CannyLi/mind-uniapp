"use strict";
const common_assets = require("../../../common/assets.js");
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 医生信息数据
    };
  },
  methods: {
    // 可以跳转到预约页面或执行其他逻辑
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_2
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
