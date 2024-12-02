<template>
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
	.doctor-profile {
		display: flex;
		align-items: center;
		background-color: #fff;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		padding: 15px;
		margin-bottom: 10px;
	}

	.image {
		margin-right: 15px;
	}

	.doctor-image {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		object-fit: cover;
	}

	.doctor-info {
		display: flex;
		flex-direction: flex;
		justify-content: center;
		flex: 1;
	}

	.doctor-name {
		font-size: 16px;
		font-weight: bold;
		color: #333;
		margin-bottom: 5px;
	}

	.doctor-introduction {
		font-size: 14px;
		color: #666;
		margin-bottom: 10px;
	}

	.distance {
		font-size: 12px;
		color: #999;
	}
</style>