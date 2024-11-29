"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      article: {},
      // 存储单篇文章数据
      isLiked: false,
      // 标记是否已点赞
      isFavorited: false
      // 标记是否已收藏
    };
  },
  onLoad() {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const articleId = currentPage.options.article_id;
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
            this.isLiked = this.article.is_liked || false;
            this.isFavorited = this.article.is_favorited || false;
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
    toggleLike() {
      if (this.isLiked) {
        this.unlikeArticle();
      } else {
        this.likeArticle();
      }
    },
    likeArticle() {
      common_vendor.index.request({
        url: `http://localhost:3000/api/articles/${this.article.article_id}/like`,
        method: "POST",
        success: (res) => {
          if (res.data.success) {
            this.article.likes += 1;
            this.isLiked = true;
          } else {
            common_vendor.index.showToast({
              title: "点赞失败",
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
    unlikeArticle() {
      common_vendor.index.request({
        url: `http://localhost:3000/api/articles/${this.article.article_id}/unlike`,
        method: "POST",
        success: (res) => {
          if (res.data.success) {
            this.article.likes -= 1;
            this.isLiked = false;
          } else {
            common_vendor.index.showToast({
              title: "取消点赞失败",
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
    toggleFavorite() {
      if (this.isFavorited) {
        this.unfavoriteArticle();
      } else {
        this.favoriteArticle();
      }
    },
    favoriteArticle() {
      common_vendor.index.request({
        url: `http://localhost:3000/api/articles/${this.article.article_id}/favorite`,
        method: "POST",
        success: (res) => {
          if (res.data.success) {
            this.article.favorites += 1;
            this.isFavorited = true;
          } else {
            common_vendor.index.showToast({
              title: "收藏失败",
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
    unfavoriteArticle() {
      common_vendor.index.request({
        url: `http://localhost:3000/api/articles/${this.article.article_id}/unfavorite`,
        method: "POST",
        success: (res) => {
          if (res.data.success) {
            this.article.favorites -= 1;
            this.isFavorited = false;
          } else {
            common_vendor.index.showToast({
              title: "取消收藏失败",
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
    a: common_vendor.t($data.article.title),
    b: common_vendor.t($data.article.publish_date),
    c: common_vendor.t($data.article.author),
    d: common_vendor.t($data.article.content),
    e: common_vendor.t($data.article.likes),
    f: $data.isLiked ? 1 : "",
    g: common_vendor.o((...args) => $options.toggleLike && $options.toggleLike(...args)),
    h: common_vendor.t($data.article.favorites),
    i: $data.isFavorited ? 1 : "",
    j: common_vendor.o((...args) => $options.toggleFavorite && $options.toggleFavorite(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3a803f59"]]);
wx.createPage(MiniProgramPage);
