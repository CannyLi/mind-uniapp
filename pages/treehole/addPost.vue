<template>
  <view class="wrapper">
    <input v-model="tag" placeholder="请输入标签" />
    <textarea v-model="posts_content" placeholder="请输入分享内容"></textarea>
    <button @click="submitPost">发布</button>
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
	  // const users_id = this.userStore.userInfo.users_id; // 获取当前登录用户的ID
	  // // console.log('当前用户ID:', users_id); // 添加调试输出
	  // if (!users_id) {
	  //   uni.showToast({
	  //     title: '用户未登录，无法发布！',
	  //     icon: 'none'
	  //   });
	  //   return;
	  //  }
	  const date = new Date().toISOString().split('T')[0]; // 获取当前日期，格式化为 YYYY-MM-DD
	  
      uni.request({
        url: 'http://localhost:3000/api/posts',
        method: 'POST',
        data: {
		  date: date,
          tag: this.tag,
          posts_content: this.posts_content,
          users_id: users_id
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
/* 样式根据需要调整 */
</style>
