"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const IndexSwiper = () => "../../components/index/IndexSwiper.js";
const FullArticle = () => "./Article/FullArticle2.js";
const _sfc_main = {
  data() {
    return {};
  },
  components: {
    IndexSwiper,
    FullArticle
  },
  onLoad() {
  },
  methods: {}
};
if (!Array) {
  const _component_IndexSwiper = common_vendor.resolveComponent("IndexSwiper");
  _component_IndexSwiper();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
