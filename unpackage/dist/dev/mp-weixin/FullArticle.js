"use strict";
const common_vendor = require("./common/vendor.js");
const _sfc_main = {
  data() {
    return {
      articles: [],
      // 存储文章数据
      searchQuery: ""
      // 存储搜索关键词
    };
  },
  onLoad() {
    this.fetchArticles();
  },
  methods: {
    fetchArticles() {
      common_vendor.index.request({
        url: "http://localhost:3000/api/articles",
        method: "GET",
        success: (res) => {
          if (res.data.success) {
            this.articles = res.data.data;
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
    // 搜索文章
    searchArticles() {
      if (this.searchQuery.trim() === "") {
        this.fetchArticles();
      } else {
        common_vendor.index.request({
          url: `http://localhost:3000/api/articles/search?q=${this.searchQuery}`,
          method: "GET",
          success: (res) => {
            if (res.data.success) {
              this.articles = res.data.data;
            } else {
              common_vendor.index.showToast({
                title: "没有找到相关文章",
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
    },
    goToArticleDetail(article) {
      console.log("Navigating to article ID:", article.article_id);
      common_vendor.index.navigateTo({
        url: `/pages/index/Article/ArticleContent?article_id=${article.article_id}`
        // 传递文章 ID
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.searchArticles && $options.searchArticles(...args)),
    b: $data.searchQuery,
    c: common_vendor.o(($event) => $data.searchQuery = $event.detail.value),
    d: common_vendor.f($data.articles, (article, k0, i0) => {
      return {
        a: article.article_image,
        b: common_vendor.t(article.title),
        c: common_vendor.t(article.publish_date),
        d: common_vendor.t(article.likes),
        e: common_vendor.t(article.favorites),
        f: article.article_id,
        g: common_vendor.o(($event) => $options.goToArticleDetail(article), article.article_id)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8bd2a792"]]);
exports.MiniProgramPage = MiniProgramPage;
