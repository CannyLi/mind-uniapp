<template>
  <view class="text">医生推荐</view>
  <view v-for="doctor in doctors" :key="doctor.doctor_id" class="doctor-profile" @click="goToDoctorInfo(doctor)">
    <view class="doctor-info">
	  <view class="image">
		  <image :src="doctor.doctor_image" class="doctor-image"></image>
	  </view>
	  <view class="info">
		  <view class="doctor-name">{{ doctor.name }}</view>
		  <view class="doctor-introduction">{{ doctor.introduction }}</view>
		  <view class="doctor-direction">{{ doctor.expertise }}</view>
	  </view>
    </view>
  </view>
</template>

<script>
import DoctorInfoVue from './DoctorInfo.vue';
export default {
  data() {
    return {
      doctors: [] // 存储医生列表
    };
  },
  onLoad() {
    this.fetchDoctors();
  },
  methods: {
    fetchDoctors() {
      uni.request({
        url: 'http://localhost:3000/api/doctors',
        method: 'GET',
        success: (res) => {
		  console.log('Response:', res); // 输出完整响应
          if (res.data.success === "0") {
            this.doctors = res.data.data; // 更新医生列表
          } else {
            uni.showToast({
              title: '获取医生失败',
              icon: 'none'
            });
          }
        },
        fail: () => {
          uni.showToast({
            title: '请求失败，请稍后重试',
            icon: 'none'
          });
        }
      });
    },
    goToDoctorInfo(doctor) {
      uni.navigateTo({
        url: `/pages/index/Doctor/DoctorInfo?doctor_id=${doctor.doctor_id}`
      });
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 80rpx;
  text-align: center;
}

.doctor-profile {
  display: flex;
  align-items: center; /* 垂直居中头像和信息 */
  margin: 20rpx;
  padding-bottom: 20rpx;
  flex-direction: row;  /* 水平排列头像和信息 */
}

.image {
  margin-right: 20rpx; /* 头像与信息之间的间距 */
}

.doctor-image {
  width: 200rpx; 
  height: 200rpx; 
  border-radius: 50%;  /* 圆形头像 */
  object-fit: cover;
}

.doctor-info {
  display: flex;
  flex-direction: row;
  justify-content: center; /* 保持信息居中 */
  flex: 1; /* 使信息部分占据剩余空间 */
}

.doctor-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.doctor-introduction {
  margin-bottom: 10rpx;
}

.doctor-direction {
  font-style: italic;
}
</style>


