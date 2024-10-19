<template>
  <view class="signup-container">
    <view class="input-group">
      <view class="label">手机号</view>
      <input type="number" placeholder="请输入11位手机号" v-model="username" maxlength="11" />
    </view>

    <view class="input-group">
      <view class="label">验证码</view>
      <view class="code-input-container">
        <input type="safe-password" placeholder="请输入验证码" v-model="code" />
        <view class="get-code-text" @click="sendCode">{{ isCodeSent ? countdown + 's' : '获取验证码' }}</view>
      </view>
    </view>

    <button @click="handleSignup">注册</button>

    <view class="login-prompt">
      <text>已有账号？</text>
      <text class="login-link" @click="goToLogin">去登录</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',    // 手机号
      code: '',     // 验证码
      isCodeSent: false, // 控制验证码按钮状态
      countdown: 60, // 倒计时初始值
      timer: null,   // 定时器
    };
  },
  methods: {
    // 发送验证码
    sendCode() {
      if (!this.isValidPhone()) {
        uni.showToast({
          title: '请输入有效的手机号',
          icon: 'none',
        });
        return;
      }

      if (this.isCodeSent) {
        return;  // 如果验证码已经发送，避免重复点击
      }
      
      // 调用后端 API 发送验证码
      uni.request({
        url: 'http://localhost:3000/api/registered', 
        method: 'POST',
        data: {
          username: this.username,
        }
	  }).then((res)=>{
		  uni.hideLoading();
		  console.log(res);
		  
		  if (res.data.data.success) {
		    uni.showToast({
		      title: '验证码已发送',
		      icon: 'success',
		    });
		    this.startCountdown();  // 开始倒计时
		  } else {
			//注册失败，显示错误信息
		    uni.showToast({
		      title: res.data.data.msg,
		      icon: 'none'
		    });
		  }
		  
	  }).catch(()=>{
		  uni.hideLoading();
		  uni.showToast({
		    title: '请求失败，请稍后重试',
		    icon: 'none',
		  });
	  })
    },

    // 开始倒计时
    startCountdown() {
      this.isCodeSent = true;
      this.countdown = 60; // 重置倒计时为60秒

      // 使用定时器，每秒减少倒计时
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          this.isCodeSent = false;
          clearInterval(this.timer); // 清除定时器
        }
      }, 1000);
    },

    // 处理注册
    handleSignup() {
      if (!this.isValidPhone() || !this.code) {
        uni.showToast({
          title: '请输入有效的手机号和验证码',
          icon: 'none',
        });
        return;
      }

      // 调用后端 API 注册
      uni.request({
        url: 'http://localhost:3000/api/signup',  
        method: 'POST',
        data: {
          username: this.username,
          code: this.code,
        },
        success: (res) => {
          if (res.data.success) {
            uni.showToast({
              title: '注册成功',
              icon: 'success',
            });
            uni.navigateTo({
              url: '/pages/login/login',
            });
          } else {
            uni.showToast({
              title: res.data.message || '注册失败',
              icon: 'none',
            });
          }
        },
        fail: () => {
          uni.showToast({
            title: '请求失败，请稍后重试',
            icon: 'none',
          });
        },
      });
    },

    // 校验手机号
    isValidPhone() {
      const phoneRegex = /^1[3-9]\d{9}$/; // 简单的中国大陆手机号正则
      return phoneRegex.test(this.username);
    },

    goToLogin() {
      uni.navigateTo({
        url: '/pages/login/login',
      });
    },
  },
};
</script>

<style scoped>
.signup-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.input-group {
  display: flex;
  align-items: center;
  width: 90%;
  margin: 10px;
}

.label {
  width: 20%; /* 标签宽度 */
  font-size: 16px;
  font-weight: bold;
  text-align: left;
}

.code-input-container {
  position: relative; /* 相对定位容器 */
  flex: 1; /* 让容器占满剩余空间，保持和上面的输入框一致 */
}

input {
  width: 60%; 
  padding-left: 5rpx;
  padding: 15rpx;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 40rpx;
  display: flex;
  justify-content: left;
}

.get-code-text {
  position: absolute;
  right: 5px;
  top: 50%; /* 垂直居中 */
  transform: translateY(-50%); /* 垂直居中 */
  color: #4ac8bd;
  font-size: 14px;
}

button {
  width: 70%;
  height: 100rpx;
  text-align: center;
  display: flex; 
  justify-content: center; 
  align-items: center; 
  padding: 10px;
  background-color: #4ac8bd;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 20px;
}

.login-prompt {
  display: flex;
  justify-content: flex-end; 
  width: 80%;
  margin-top: 10px;
}

.login-link {
  color: #4ac8bd; /* 登录链接颜色 */
}
</style>
