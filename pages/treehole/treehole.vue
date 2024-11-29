<template>
  <view class="wrapper">
    <view v-for="post in posts" :key="post.id" class="post-list">
      <view class="top">
        <img :src="post.users_image" class="avatar" />
        <view class="name">{{ post.nickname }}</view>
        <view class="time">{{ post.date }}</view>
      </view>
      <view class="message">{{ post.posts_content }}</view>
      <view class="foot">
        <view class="foot-left">{{ post.tag }}</view>
        <view class="foot-right">
          <text
            class="iconfont icon-xihuan"
            :class="{ liked: post.liked }"
            @click="toggleLike(post)"
          >
            {{ post.like_count }}
          </text>
          <!-- <text @click="viewComments(post.id)">{{ post.comment_count }} 评论</text> -->
        </view>
      </view>
    </view>
    <!-- 悬浮加号按钮 -->
    <view class="floating-button" @click="navigateToPublish">
      <text class="plus">+</text>
    </view>
  </view>
</template>

<script>
import { useUserStore } from "../../stores/modules/users";

export default {
  data() {
    return {
      posts: [], // 用于存储情绪分享列表
    };
  },
  setup() {
    const userStore = useUserStore();
    userStore.initUser(); // 初始化用户信息

    return {
      userStore,
    };
  },
  methods: {
    fetchPosts() {
      uni.request({
        url: "http://localhost:3000/api/posts", // 请求情绪分享列表
        method: "GET",
        success: (res) => {
          if (res.data.success === "0") {
            this.posts = res.data.data.map((post) => ({
              ...post,
              liked: false, // 默认未点赞
            }));
          } else {
            uni.showToast({
              title: res.data.msg,
              icon: "none",
            });
          }
        },
        fail: (error) => {
          uni.showToast({
            title: "加载失败，请稍后再试",
            icon: "none",
          });
        },
      });
    },
    toggleLike(post) {
      const api = post.liked
        ? `http://localhost:3000/api/posts/${post.posts_id}/unlike`
        : `http://localhost:3000/api/posts/${post.posts_id}/like`;

      uni.request({
        url: api,
        method: "POST",
        success: (res) => {
          if (res.data.success) {
            // 更新点赞状态和计数
            post.liked = !post.liked;
            post.like_count += post.liked ? 1 : -1;
            const msg = post.liked ? "点赞成功" : "取消点赞成功";
            uni.showToast({
              title: msg,
              icon: "success",
            });
          } else {
            const msg = post.liked ? "取消点赞失败" : "点赞失败";
            uni.showToast({
              title: msg,
              icon: "none",
            });
          }
        },
        fail: (error) => {
          uni.showToast({
            title: "操作失败，请稍后再试",
            icon: "none",
          });
        },
      });
    },
    navigateToPublish() {
      uni.navigateTo({
        url: "/pages/treehole/addPost",
      });
    },
  },
  onLoad() {
    // 检查登录状态
    if (!this.userStore.loginStatus) {
      uni.navigateTo({
        url: "/pages/LoginSignupHome/LoginSignupHome", // 登录页面的路径
      });
      uni.showToast({
        title: "请先登录！",
        icon: "none",
        duration: 2000,
      });
    } else {
      this.fetchPosts(); // 加载情绪分享列表
    }
  },
};
</script>

<style scoped>
.wrapper {
  padding-bottom: 10rpx;
}
.post-list {
  background-color: none;
  box-shadow: 8rpx 8rpx 0rpx 0rpx darkgrey;
  border: 1.5px solid #4ac8bd;
  border-radius: 20rpx;
  padding: 35rpx;
  margin: 40rpx;
  margin-bottom: 80rpx;
}

.avatar {
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  margin-right: -250rpx;
}

.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40rpx;
}

.foot {
  display: flex;
  justify-content: space-between;
  margin-top: 40rpx;
}

.foot-left {
  font-size: 25rpx;
  color: white;
  background-color: #4ac8bd;
  padding: 8rpx;
  border-radius: 15rpx;
}

.icon {
  height: 30rpx;
  width: 30rpx;
}

.floating-button {
  position: fixed; /* 固定定位 */
  bottom: 30rpx;
  right: 30rpx;
  width: 100rpx;
  height: 100rpx;
  background-color: #4ac8bd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0px 4px darkgrey;
  font-size: 50rpx;
  color: white;
}

.liked {
  color: red;
}
</style>
