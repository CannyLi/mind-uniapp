"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      article: {}
      // 存储单篇文章数据
    };
  },
  onLoad() {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    console.log("Current Page Options:", currentPage.options);
    const articleId = currentPage.options.article_id;
    console.log("Article ID:", articleId);
    if (articleId) {
      this.fetchArticle(articleId);
    } else {
      common_vendor.index.showToast({
        title: "文章 ID 无效",
        icon: "none"
      });
    }
  },
  methods: {
    fetchArticle(articleId) {
      common_vendor.index.request({
        url: `http://localhost:3000/api/articles/${articleId}`,
        // 后端接口
        method: "GET",
        success: (res) => {
          if (res.data.success) {
            this.article = res.data.data;
          } else {
            common_vendor.index.showToast({
              title: "获取文章失败",
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
    },
    likeArticle() {
    },
    favoriteArticle() {
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.article.title),
    b: common_vendor.t($data.article.publish_date),
    c: common_vendor.t($data.article.author),
    d: common_vendor.t($data.article.content),
    e: common_vendor.o((...args) => $options.likeArticle && $options.likeArticle(...args)),
    f: common_vendor.o((...args) => $options.favoriteArticle && $options.favoriteArticle(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3a803f59"]]);
wx.createPage(MiniProgramPage);
