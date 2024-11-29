<template>
  <view class="wrapper">
    <textarea class="content" v-model="posts_content" placeholder="请输入分享内容" maxlength="1000"></textarea>
	<span class="char-count">{{ posts_content.length }}/1000</span>
	<view class="tag">
		<view class="iconfont icon-tag"></view>
		<textarea v-model="tag" placeholder="请输入自定义标签(最多5个字)" maxlength="5" />
	</view>
    <button class="submitPost-btn" @click="submitPost">发布</button>
  </view>
</template>

<script>
import { useUserStore } from '../../stores/modules/users';

export default {
  data() {
    return {
      tag: '',
      posts_content: ''
    };
  },
  setup() {
    const userStore = useUserStore();
	// 初始化用户信息
	userStore.initUser();
    return { userStore };
  },
  methods: {
    submitPost() {
	  const { users_id, users_image } = this.userStore.userInfo; // 获取当前登录用户的ID、用户头像
	  // console.log('当前用户ID:', users_id); // 添加调试输出
	  if (!users_id) {
	    uni.showToast({
	      title: '用户未登录，无法发布！',
	      icon: 'none'
	    });
	    return;
	   }
	  const date = new Date().toISOString().split('T')[0]; // 获取当前日期，格式化为 YYYY-MM-DD
	  
      uni.request({
        url: 'http://localhost:3000/api/posts',
        method: 'POST',
        data: {
		  date: date,
          tag: this.tag,
          posts_content: this.posts_content,
          users_id,
		  users_image
        },
        success: (res) => {
          if (res.data.success === "0") {
            uni.showToast({
              title: '发布成功',
              icon: 'success'
            });
            // 清空输入
            this.tag = '';
            this.posts_content = '';
			setTimeout(() => {
              uni.switchTab({
                url: '/pages/treehole/treehole' 
              });
            }, 1000); // 延迟1秒后跳转，以便用户看到发布成功的提示
          } else {
            uni.showToast({
              title: res.data.msg,
              icon: 'none'
            });
          }
        },
        fail: () => {
          uni.showToast({
            title: '网络错误',
            icon: 'none'
          });
        }
      });
    }
  },
  onLoad() {
      // 检查登录状态
      if (!this.userStore.loginStatus) {
          uni.navigateTo({
          	url: '/pages/LoginSignupHome/LoginSignupHome' // 登录页面的路径
          });
  		  uni.showToast({
  		  	title:'请先登录！',
  			icon:'none',
  			duration:2000
  		  })
      }
  }
};
</script>

<style scoped>
.wrapper{
	padding: 25rpx;
}
.content{
	width: 100%;
}
.char-count {
  float: right; 
  margin-top: 10px; 
  font-size: 14px; 
  color: #888;
}
.tag{
	margin-top: 80rpx;
	display: flex;
}
.submitPost-btn{
	background-color: #4ac8bd;
	color: white; 
	border: none;
	border-radius: 4px; 
	padding: 10rpx 0; 
	width: 100%; 
}
</style>
