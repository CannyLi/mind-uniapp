"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      carouselImages: []
      // 存储轮播图数据
    };
  },
  created() {
    this.fetchCarouselImages();
  },
  methods: {
    fetchCarouselImages() {
      common_vendor.index.request({
        url: "http://localhost:3000/api/getCarousels",
        // 后端接口
        method: "GET",
        success: (res) => {
          if (res.data.success && res.data.data) {
            this.carouselImages = res.data.data.map((item) => item.images);
          } else {
            common_vendor.index.showToast({
              title: "获取轮播图失败",
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
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.carouselImages, (image, index, i0) => {
      return {
        a: image,
        b: index
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0c4e0226"]]);
wx.createComponent(Component);
