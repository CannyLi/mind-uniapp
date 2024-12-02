"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_modules_userStore = require("../../stores/modules/userStore.js");
const _sfc_main = {
  data() {
    return {
      posts: []
      // 用于存储情绪分享列表
    };
  },
  setup() {
    const userStore = stores_modules_userStore.useUserStore();
    userStore.initUser();
    const formatDate = (dateString) => {
      if (!dateString)
        return "未填写";
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    return {
      userStore,
      formatDate
    };
  },
  methods: {
    fetchPosts() {
      common_vendor.index.request({
        url: "http://localhost:3000/api/posts",
        // 请求情绪分享列表
        method: "GET",
        success: (res) => {
          if (res.data.success === "0") {
            this.posts = res.data.data.map((post) => ({
              ...post,
              liked: false,
              // 默认未点赞
              date: this.formatDate(post.date)
              // 格式化日期字段
            }));
          } else {
            common_vendor.index.showToast({
              title: res.data.msg,
              icon: "none"
            });
          }
        },
        fail: (error) => {
          common_vendor.index.showToast({
            title: "加载失败，请稍后再试",
            icon: "none"
          });
        }
      });
    },
    toggleLike(post) {
      const api = post.liked ? `http://localhost:3000/api/posts/${post.posts_id}/unlike` : `http://localhost:3000/api/posts/${post.posts_id}/like`;
      common_vendor.index.request({
        url: api,
        method: "POST",
        success: (res) => {
          if (res.data.success) {
            post.liked = !post.liked;
            post.like_count += post.liked ? 1 : -1;
            const msg = post.liked ? "点赞成功" : "取消点赞成功";
            common_vendor.index.showToast({
              title: msg,
              icon: "success"
            });
          } else {
            const msg = post.liked ? "取消点赞失败" : "点赞失败";
            common_vendor.index.showToast({
              title: msg,
              icon: "none"
            });
          }
        },
        fail: (error) => {
          common_vendor.index.showToast({
            title: "操作失败，请稍后再试",
            icon: "none"
          });
        }
      });
    },
    navigateToPublish() {
      common_vendor.index.navigateTo({
        url: "/pages/treehole/addPost"
      });
    }
  },
  onLoad() {
    if (!this.userStore.loginStatus) {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
        // 登录页面的路径
      });
      common_vendor.index.showToast({
        title: "请先登录！",
        icon: "none",
        duration: 2e3
      });
    } else {
      this.fetchPosts();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.posts, (post, k0, i0) => {
      return {
        a: post.users_image,
        b: common_vendor.t(post.nickname),
        c: common_vendor.t(post.date),
        d: common_vendor.t(post.posts_content),
        e: common_vendor.t(post.tag),
        f: common_vendor.t(post.like_count),
        g: post.liked ? 1 : "",
        h: common_vendor.o(($event) => $options.toggleLike(post), post.id),
        i: post.id
      };
    }),
    b: common_vendor.o((...args) => $options.navigateToPublish && $options.navigateToPublish(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2b7b037f"]]);
wx.createPage(MiniProgramPage);
