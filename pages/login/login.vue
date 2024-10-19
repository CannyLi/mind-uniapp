<template>
  <view class="login-container">
    <view class="input-group">
      <view class="label">账号</view>
      <input type="text" placeholder="请输入手机号/用户名" v-model="username" />
    </view>
    <view class="input-group">
      <view class="label">密码</view>
      <input type="password" placeholder="6-16位字符" v-model="password" />
    </view>
	<view class="others">
		<view class="forget-btn" @click="sendSMS">忘记密码？</view>
		<view class="gotologin" @click="goToLogin">去注册</view>
	</view>

    <button @click="handleLogin" class="login-button">登录</button>

    <view class="other-login">
      <view class="text2">--或者使用以下方式登录--</view>
	<image class="wechat-icon" @click="handleWeChatLogin" 
	src="../../static/images/WeChatLogo.png" alt="微信登录" />
    </view>
  </view>
</template>


<script>
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      username: '',
      password: '',
      // 验证规则
      rules: {
        username: {
          rule: /\S+/,
          msg: "账号不能为空！"
        },
        password: {
          rule: /^[0-9a-zA-Z]{6,16}$/,
          msg: "密码应该为6-16位字符"
        }
      }
    };
  },
  methods: {
	...mapMutations('users', ['login']),//对象展开运算符直接拿到login
    handleLogin() {
      // 验证账号和密码
      if (!this.validate('username')) return;
      if (!this.validate('password')) return;

      uni.showLoading({
        title: "登录中..."
      });

      uni.request({
        url: 'http://localhost:3000/api/login',
        method: 'POST',
        data: {
          username: this.username,
          password: this.password
        }
      }).then((res) => {
        uni.hideLoading(); // 确保在请求完成后隐藏加载提示
		console.log(res);
		// this.login(res.data.data.msg);
		
        if (res.data.data.success) {
		// 登录成功，提取必要的用户信息和token
		const userInfo = {
			nickname: res.data.data.data.nickname,
			users_image: res.data.data.data.users_image,
		// 可以添加更多需要的用户信息字段
		};
		const token = res.data.data.token; // 确保后端返回了token
			
		// 提交login mutation，包含用户信息和token
		this.login({ userInfo, token });
          // 登录成功，跳转到指定页面
          uni.showToast({
            title: res.data.data.msg,
            icon: 'success'
          });
          setTimeout(() => {
            uni.navigateBack({
              delta: 2
            });
          }, 1000); // 延迟1秒后返回
        } else {
          // 登录失败，显示错误信息
          uni.showToast({
            title: res.data.data.msg,
            icon: 'none'
          });
        }
      }).catch(() => {
        uni.hideLoading(); // 确保在请求失败时隐藏加载提示
        uni.showToast({
          title: '请求失败',
          icon: 'none'
        });
      });
    },
    validate(key) {
      let isValid = true;
      // 验证是否通过，如果未通过则弹出提示
      if (!this.rules[key].rule.test(this[key])) {
        uni.showToast({
          title: this.rules[key].msg,
          icon: "none"
        });
        isValid = false;
      }
      return isValid;
    },
    handleWeChatLogin() {
      console.log('Login with WeChat');
      uni.switchTab({
        url: '/pages/index/index',
      });
    },
    sendSMS() {
      console.log(`Sending SMS to the registered phone number for ${this.username}`);
      uni.showToast({
        title: 'SMS sent!',
        icon: 'success',
        duration: 2000,
      });
    },
    goToLogin() {
      uni.navigateTo({
        url: '/pages/signup/signup'
      });
    }
  }
};
</script>


<style scoped>
.login-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
}
	
.label {
	width: 15%;
	margin: 10px 0;
	font-size: 16px;
	font-weight: bold;
	text-align: left;
}

input {
	width: 100%;
	padding: 10px;
	margin: 10px 0;
	border: 1px solid #ccc;
	border-radius: 4px;
}

.input-group {
	display: flex;
	align-items: center;
	width: 90%;
	margin: 10px 0;
}

.others{
	display: flex;
	justify-content: space-between;
	width: 90%;
}

.forget-btn {
	text-align: left;
	width: 100%; 
}

.gotologin{
	width: 100%;
	text-align: right;
}
	
.login-button {
	width: 70%;
	height: 100rpx;
	padding: 10px;
	background-color: #4ac8bd;
	color: white;
	border: none;
	border-radius: 4px;
	margin-top: 20px;
	text-align: center;
	display: flex; 
	justify-content: center; 
	align-items: center; 
}

.other-login {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;
}

.wechat-icon {
	margin-top: 50rpx;
	width: 50px; 
	height: 50px; 
}
</style>
