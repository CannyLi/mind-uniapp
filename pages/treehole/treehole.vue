<template>
<!--  <image src="../../static/images/treehole.jpg" class="image"></image> -->
  <view class="post-list">
	<view class="top">
		<view class="name">昵称</view>
		<view class="time">2024.10.21</view>
	</view>
	<view class="message">这里是文章内容1，可以包含很多详细信息...这里是文章内容1，可以包含很多详细信息...</view>
	<view class="foot">
		<view class="foot-left">心情</view>
		<view class="foot-right">
			<img src="@/static/images/settings.png" class="icon" >3</img>
			<img src="@/static/images/settings.png" class="icon" >3</img>
		</view>
	</view>
  </view>
</template>

<script>
	import { useUserStore } from '../../stores/modules/users';
	export default {
		data() {
			return {
				
			}
		},
		setup() {
		    const userStore = useUserStore();
		        
		    // 初始化用户信息
		    userStore.initUser();
		
		    return {
		        userStore
		    };
		},
		components:{
			
		},
		methods: {
			
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

	}
</script>

<style scoped>
/* .image{
	height: 200rpx;
	width: 100%;
} */
.post-list{
	background-color: none;
	box-shadow: 8rpx 8rpx 0rpx 0rpx darkgrey;
	border: 1.5px solid #4ac8bd;
	border-radius: 20rpx;
	padding: 35rpx;
	margin: 40rpx;
}	
	
.top{
	display: flex;
	justify-content: space-between;
	margin-bottom: 40rpx;
}

.foot{
	display: flex;
	justify-content: space-between;
	margin-top: 40rpx;
}

.icon{
	height: 30rpx;
	width: 30rpx;
}



</style>
