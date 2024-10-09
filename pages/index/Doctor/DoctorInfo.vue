<template>
  <view class="doctor-profile">
    <image src="../../../static/images/Swiper/swiper3.jpg" class="doctor-image"></image>
    <view class="doctor-info">
      <view class="doctor-name">医生姓名</view>
      <view class="doctor-introduction">个人简介：这里是医生的个人简介信息。</view>
      <view class="doctor-expertise">擅长领域：这里是医生擅长的领域。</view>
      <view class="consultation-notes">咨询须知：这里是咨询的注意事项。</view>
      <button class="book-button" >立即咨询</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 医生信息数据
    };
  },
  methods: {

      // 可以跳转到预约页面或执行其他逻辑
  }
};
</script>

<style>
.doctor-profile {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.doctor-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.doctor-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.doctor-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.doctor-introduction,
.doctor-expertise,
.consultation-notes {
  margin-bottom: 10px;
  color: #666;
}

.book-button {
  background-color: #4ac8bd;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
}

/* .book-button:active {
  opacity: 0.9;
} */
</style>