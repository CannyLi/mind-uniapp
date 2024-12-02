<template>
	<view class="doctor-profile">
		<image :src="doctor.doctor_image" class="doctor-image"></image>
		<view class="doctor-info">
			<view class="doctor-name">{{ doctor.name }}</view>
			<view class="doctor-introduction">个人简介：{{ doctor.introduction }}</view>
			<view class="doctor-expertise">擅长领域：{{ doctor.expertise }}</view>
			<view class="consultation-notes">咨询须知：{{ doctor.consultation_notice }}</view>
			<button class="book-button" @click="goToAppointmentTable()">立即预约</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				doctor: {} // 存储医生信息
			};
		},
		onLoad() {
			const pages = getCurrentPages();
			const currentPage = pages[pages.length - 1];
			const doctorId = currentPage.options.doctor_id; // 获取 doctor_id
			this.fetchDoctorInfo(doctorId);
		},
		methods: {
			fetchDoctorInfo(doctorId) {
				uni.request({
					url: `http://localhost:3000/api/doctors/${doctorId}`,
					method: 'GET',
					success: (res) => {
						if (res.data.success === "0") {
							this.doctor = res.data.data; // 更新医生信息
						} else {
							uni.showToast({
								title: '获取医生信息失败',
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
			goToAppointmentTable() {
				uni.navigateTo({
					url: '/pages/index/Appointment/AppointmentTable'
				});
			}
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
		width: 250px;
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