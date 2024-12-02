"use strict";
const common_vendor = require("../../../common/vendor.js");
const stores_modules_userStore = require("../../../stores/modules/userStore.js");
const _sfc_main = {
  setup() {
    const userStore = stores_modules_userStore.useUserStore();
    const posts = common_vendor.ref([]);
    const fetchPosts = async () => {
      try {
        const response = await common_vendor.index.request({
          url: `http://localhost:3000/api/posts/user/${userStore.userInfo.users_id}`,
          method: "GET"
        });
        console.log("response", response.data);
        if (response.statusCode === 200 && response.data.success === "0") {
          posts.value = response.data.data;
        } else {
          common_vendor.index.showToast({
            title: "获取发布信息失败",
            icon: "none"
          });
        }
      } catch (error) {
        console.error("获取发布信息错误:", error);
        common_vendor.index.showToast({
          title: "获取发布信息失败，请稍后再试。",
          icon: "none"
        });
      }
    };
    const deletePost = async (postId) => {
      try {
        const response = await common_vendor.index.request({
          url: `http://localhost:3000/api/posts/${postId}`,
          method: "DELETE"
        });
        if (response.statusCode === 200 && response.data.success === "0") {
          posts.value = posts.value.filter((post) => post.posts_id !== postId);
          common_vendor.index.showToast({
            title: "删除成功",
            icon: "success"
          });
        } else {
          common_vendor.index.showToast({
            title: "删除失败",
            icon: "none"
          });
        }
      } catch (error) {
        console.error("删除发布内容错误:", error);
        common_vendor.index.showToast({
          title: "删除发布内容失败，请稍后再试。",
          icon: "none"
        });
      }
    };
    common_vendor.onMounted(() => {
      fetchPosts();
    });
    return {
      posts,
      deletePost,
      userStore
    };
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
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.posts.length === 0
  }, $setup.posts.length === 0 ? {} : {
    b: common_vendor.f($setup.posts, (post, index, i0) => {
      return {
        a: common_vendor.t(post.nickname),
        b: common_vendor.t(post.posts_content),
        c: common_vendor.t(post.tag),
        d: common_vendor.t(post.like_count),
        e: common_vendor.o(($event) => $setup.deletePost(post.posts_id), post.posts_id),
        f: post.posts_id
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-45a0525d"]]);
wx.createPage(MiniProgramPage);
