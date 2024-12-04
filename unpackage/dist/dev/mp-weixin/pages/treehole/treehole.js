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
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      date.getSeconds().toString().padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}`;
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
              date: this.formatDate(post.date),
              // 格式化日期字段
              newCommentContent: "",
              // 每个帖子独立的评论输入内容
              showComments: false,
              // 默认隐藏评论区
              comments: []
            }));
            this.fetchCommentsForPosts();
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
    fetchCommentsForPosts() {
      this.posts.forEach((post) => {
        common_vendor.index.request({
          url: `http://localhost:3000/api/posts/${post.posts_id}/comments`,
          // 获取评论列表
          method: "GET",
          success: (res) => {
            if (res.data.success) {
              post.comments = res.data.comments.map((comment) => ({
                ...comment,
                created_at: this.formatDate(comment.created_at)
                // 格式化评论日期字段
              }));
              post.comment_count = post.comments.length;
            }
          }
        });
      });
    },
    toggleComments(post) {
      post.showComments = !post.showComments;
    },
    addComment(post) {
      const {
        users_image,
        nickname,
        users_id
      } = this.userStore.userInfo;
      if (!post.newCommentContent)
        return;
      const createdAt = this.formatDate(/* @__PURE__ */ new Date());
      common_vendor.index.request({
        url: `http://localhost:3000/api/posts/${post.posts_id}/comments`,
        // 添加评论
        method: "POST",
        data: {
          comment_content: post.newCommentContent,
          user_id: users_id,
          // 确保发送用户ID,
          created_at: createdAt
          // 发送当前时间到后端
        },
        success: (res) => {
          if (res.data.success) {
            post.comments.push({
              comment_content: post.newCommentContent,
              like_count: 0,
              users_image,
              users_nickname: nickname
            });
            post.comment_count += 1;
            post.newCommentContent = "";
            common_vendor.index.showToast({
              title: "评论成功",
              icon: "success"
            });
          }
        }
      });
    },
    //删除发布的评论的内容
    deletePostComment(commentId, userId) {
      common_vendor.index.request({
        url: `http://localhost:3000/api/comments/${commentId}/${userId}`,
        method: "DELETE",
        success: (response) => {
          console.log("response", response);
          if (response.data.statusCode === 200 && response.data.data.success === true) {
            const post = this.posts.find((p) => p.comments.some((c) => c.comment_id === commentId));
            if (post) {
              post.comments = post.comments.filter((comment) => comment.comment_id !== commentId);
            }
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
        },
        fail: (error) => {
          console.error("删除发布内容错误:", error);
          common_vendor.index.showToast({
            title: "删除发布内容失败，请稍后再试。",
            icon: "none"
          });
        }
      });
    },
    toggleLikeComment(comment) {
      const api = comment.liked ? `http://localhost:3000/api/comments/${comment.comment_id}/unlike` : `http://localhost:3000/api/comments/${comment.comment_id}/like`;
      common_vendor.index.request({
        url: api,
        method: "POST",
        success: (res) => {
          if (res.data.success) {
            comment.liked = !comment.liked;
            comment.comment_like_count += comment.liked ? 1 : -1;
          }
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
      this.posts.forEach((post) => {
        this.fetchComments(post);
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.posts, (post, k0, i0) => {
      return common_vendor.e({
        a: post.users_image,
        b: common_vendor.t(post.users_nickname),
        c: common_vendor.t(post.date),
        d: common_vendor.t(post.posts_content),
        e: common_vendor.t(post.tag),
        f: common_vendor.t(post.like_count),
        g: post.liked ? 1 : "",
        h: common_vendor.o(($event) => $options.toggleLike(post), post.id),
        i: common_vendor.t(post.comment_count),
        j: common_vendor.o(($event) => $options.toggleComments(post), post.id),
        k: post.showComments
      }, post.showComments ? {
        l: post.newCommentContent,
        m: common_vendor.o(($event) => post.newCommentContent = $event.detail.value, post.id),
        n: common_vendor.o(($event) => $options.addComment(post), post.id),
        o: common_vendor.f(post.comments, (comment, k1, i1) => {
          return {
            a: comment.users_image,
            b: common_vendor.t(comment.nickname),
            c: common_vendor.t(comment.created_at),
            d: common_vendor.t(comment.comment_content),
            e: common_vendor.o(($event) => $options.deletePostComment(comment.comment_id, comment.user_id), comment.comment_id),
            f: common_vendor.t(comment.comment_like_count),
            g: comment.liked ? 1 : "",
            h: common_vendor.o(($event) => $options.toggleLikeComment(comment), comment.comment_id),
            i: comment.comment_id
          };
        })
      } : {}, {
        p: post.id
      });
    }),
    b: common_vendor.o((...args) => $options.navigateToPublish && $options.navigateToPublish(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2b7b037f"]]);
wx.createPage(MiniProgramPage);
