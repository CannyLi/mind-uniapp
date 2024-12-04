"use strict";
const common_vendor = require("../../common/vendor.js");
const IndexSwiper = () => "../../components/index/IndexSwiper.js";
const FullArticle = () => "./Article/FullArticle2.js";
const _sfc_main = {
  data() {
    return {
      articles: []
    };
  },
  components: {
    IndexSwiper,
    FullArticle
  },
  onLoad() {
    this.fetchArticles();
  },
  methods: {
    fetchArticles() {
      common_vendor.index.request({
        url: "http://101.33.203.222:3000/api/articles",
        method: "GET",
        success: (res) => {
          console.log("Fetched article:", res.data);
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
            title: "请求失败，请稍后重试。",
            icon: "none"
          });
        }
      });
    },
    goToArticleContent(article) {
      console.log("Navigating to article ID:", article.article_id);
      common_vendor.index.navigateTo({
        url: `/pages/index/Article/ArticleContent?article_id=${article.article_id}`
        // 使用反引号
      });
    }
  }
};
if (!Array) {
  const _component_IndexSwiper = common_vendor.resolveComponent("IndexSwiper");
  _component_IndexSwiper();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.articles, (article, k0, i0) => {
      return {
        a: article.article_image,
        b: common_vendor.t(article.title),
        c: common_vendor.t(article.publish_date),
        d: common_vendor.t(article.likes),
        e: common_vendor.t(article.favorites),
        f: article.article_id,
        g: common_vendor.o(($event) => $options.goToArticleContent(article), article.article_id)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
