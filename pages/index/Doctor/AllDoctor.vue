<template>
  <view class="text">医生推荐</view>
  <view v-for="doctor in doctors" :key="doctor.doctor_id" class="doctor-profile" @click="goToDoctorInfo(doctor)">
    <image :src="doctor.doctor_image" class="doctor-image"></image>
    <view class="doctor-info">
      <view class="doctor-name">{{ doctor.name }}</view>
      <view class="doctor-introduction">{{ doctor.introduction }}</view>
      <view class="doctor-direction">{{ doctor.expertise }}</view>
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
.text{
	font-size: 80rpx;
	text-align: center;
}
.doctor-profile {
  display: flex;
  align-items: center;
  margin: 20px;
  padding-bottom: 20rpx;
}

.doctor-image {
  width: 250px; 
  height: 100px; 
  border-radius: 50%; /* 圆形 */
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