"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_modules_users = require("../../stores/modules/users.js");
const _sfc_main = {
  data() {
    return {
      posts: []
      // 用于存储情绪分享列表
    };
  },
  setup() {
    const userStore = stores_modules_users.useUserStore();
    userStore.initUser();
    return {
      userStore
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
            this.posts = res.data.data;
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
    likePost(postId) {
      common_vendor.index.showToast({
        title: "点赞成功",
        icon: "success"
      });
    },
    //跳转到评论页面
    viewComments(postId) {
      common_vendor.index.navigateTo({
        url: `/pages/treehole/comments?pid=${postId}`
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
        url: "/pages/LoginSignupHome/LoginSignupHome"
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
        g: common_vendor.t(post.comment_count),
        h: common_vendor.o(($event) => $options.viewComments(post.id), post.id),
        i: post.id
      };
    }),
    b: common_vendor.o((...args) => $options.navigateToPublish && $options.navigateToPublish(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2b7b037f"]]);
wx.createPage(MiniProgramPage);
