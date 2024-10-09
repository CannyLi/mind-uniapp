<template>
  <view class="text">医生推荐</view>
  <navigator class="doctor-profile" url="/pages/index/Doctor/DoctorInfo">
    <image src="../../../static/images/Swiper/swiper2.jpg" class="doctor-image"></image>
    <view class="doctor-info">
      <view class="doctor-name">医生姓名</view>
      <view class="doctor-introduction">介绍</view>
      <view class="doctor-direction">咨询方向</view>
    </view>
  </navigator>
</template>
	
<script>
	import DoctorInfo from "./DoctorInfo.vue";
</script>

<style scoped>
.text{
	font-size: 80rpx;
	text-align: center;
}
.doctor-profile {
  display: flex;
  align-items: center;
  margin: 20px;
}

.doctor-image {
  width: 100px; 
  height: 100px; 
  border-radius: 50%; 
  object-fit: cover; 
  margin-right: 20px; 
}

.doctor-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.doctor-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.doctor-introduction {
  margin-bottom: 10px;
}

.doctor-direction {
  font-style: italic;
}
</style>