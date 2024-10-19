
<template>
  <view class="container">
    <!-- 用户信息 -->
    <view class="user-info" @tap="goToLoginSignupHome">
      <image class="avatar" :src="loginStatus ? userInfo.users_image : '../../static/images/Swiper/swiper1.jpg'" mode="aspectFill"></image>
      <view class="user-details">
        <text class="nickname">{{ loginStatus ? userInfo.nickname : "用户名称"  }}</text>
      </view>
    </view>

    <!-- 设置 -->
    <view class="settings-section">
<!--      <navigator url="/pages/settings/settings"> -->
        <view class="settings-item">
          <text>设置</text>
          <text class="arrow">></text>
        </view>
<!--      </navigator> -->
    </view>

    <!-- 我的预约 -->
    <view class="section">
<!--      <navigator url="/pages/reservation/reservation"> -->
        <view class="item">
          <text>我的预约</text>
          <text class="arrow">></text>
        </view>
<!--      </navigator> -->
    </view>

    <!-- 我的发布 -->
    <view class="section">
<!--      <navigator url="/pages/posts/posts"> -->
        <view class="item">
          <text>我的发布</text>
          <text class="arrow">></text>
        </view>
<!--      </navigator> -->
    </view>

    <!-- 我的收藏 -->
    <view class="section">
<!--      <navigator url="/pages/collections/collections"> -->
        <view class="item">
          <text>我的收藏</text>
          <text class="arrow">></text>
        </view>
<!--      </navigator> -->
    </view>

    <!-- 意见反馈 -->
    <view class="section">
<!--      <navigator url="/pages/feedback/feedback"> -->
        <view class="item">
          <text>意见反馈</text>
          <text class="arrow">></text>
        </view>
<!--      </navigator> -->
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {}
  },
  methods:{
	  goToLoginSignupHome(){
		  uni.navigateTo({
		  	url:'/pages/LoginSignupHome/LoginSignupHome'
		  })
	  }
  },
  computed: {
	  ...mapState('users',{
	  	// 从state中拿到数据
	  	loginStatus: state => state.loginStatus,
	  	userInfo: state => state.userInfo
	  	// token: state => state.token
	  })
  }
}
</script>

<style scoped>
.container {
  padding: 20rpx;
}

.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  padding: 20rpx;
  background-color: #fff;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.user-details {
  flex: 1;
}

.nickname {
  font-size: 32rpx;
  font-weight: bold;
}

.phone {
  font-size: 28rpx;
  color: #888;
}

.settings-section, .section {
  margin-top: 20rpx;
}

.item, .settings-item {
  padding: 20rpx;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.arrow {
  color: #888;
  font-size: 30rpx;
}
</style>
