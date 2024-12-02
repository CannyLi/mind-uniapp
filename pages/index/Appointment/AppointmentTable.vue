<template>
	<view class="appointment-form">
		<view>
			<form @submit.prevent="submitAppointment" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="title">预约人姓名</view>
					<input class="uni-input" v-model="appointment.user_real_name" required />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">电话号码</view>
					<input class="uni-input" v-model="appointment.user_mobile_phone" required />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">学号</view>
					<input class="uni-input" v-model="appointment.studentId" required />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">学院</view>
					<input class="uni-input" v-model="appointment.college" required />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">所在校区</view>
					<input class="uni-input" v-model="appointment.campus" required />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">预约时间</view>
					<picker mode="date" @change="onDateChange">
						<view class="picker">{{ appointment.appointmentDate || '选择预约时间' }}</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">选择预约医师</view>
					<picker mode="selector" :range="doctors" @change="onDoctorChange">
						<view class="picker">{{ doctors[appointment.doctorIndex] || '选择医师' }}</view>
					</picker>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">咨询意向</view>
					<picker mode="selector" :range="consultIntentions" @change="onConsultIntentionChange">
						<view class="picker">{{ consultIntentions[appointment.consultIntentionIndex] || '选择咨询意向' }}
						</view>
					</picker>
				</view>
				<view class="uni-btn-v">
					<button class="submit-btn" form-type="submit">提交预约</button>
					<button class="reset-btn" type="default" form-type="reset">重置</button>
				</view>
			</form>
		</view>
	</view>
</template>


<script>
	import {
		useUserStore
	} from '../../../stores/modules/userStore.js';

	export default {
		setup() {
			const userStore = useUserStore();

			// 初始化用户信息
			userStore.initUser();

			return {
				userStore
			};
		},
		data() {
			return {
				appointment: {
					user_real_name: '',
					user_mobile_phone: '',
					studentId: '',
					college: '',
					campus: '',
					appointmentDate: '',
					doctorIndex: 0,
					consultIntentionIndex: 0
				},
				doctors: [],
				consultIntentions: ['心理咨询', '职业规划', '健康咨询']
			};
		},
		mounted() {
			this.fetchDoctors(); // 组件挂载时获取医生列表
		},
		methods: {
			fetchDoctors() {
				uni.request({
					url: 'http://localhost:3000/api/doctors',
					method: 'GET',
					success: (response) => {
						if (response.data.success === "0") {
							this.doctors = response.data.data.map(doctor => doctor.name);
						} else {
							uni.showToast({
								title: '获取医生列表失败',
								icon: 'none'
							});
						}
					},
					fail: () => {
						uni.showToast({
							title: '请求失败，请重试',
							icon: 'none'
						});
					}
				});
			},
			submitAppointment() {
				const appointmentData = {
					user_real_name: this.appointment.user_real_name,
					user_mobile_phone: this.appointment.user_mobile_phone,
					studentId: this.appointment.studentId,
					college: this.appointment.college,
					campus: this.appointment.campus,
					appointmentDate: this.appointment.appointmentDate,
					consultIntention: this.consultIntentions[this.appointment.consultIntentionIndex]
				};

				console.log('提交的预约数据:', appointmentData); // 打印数据

				// 使用 uni.request 提交数据
				uni.request({
					url: 'http://localhost:3000/api/appointments',
					method: 'POST',
					data: {
						users_id: this.userStore.userInfo.users_id, // 直接传递 users_id
						...appointmentData // 展开传递预约数据
					},
					success: (response) => {
						console.log('请求成功:', response);
						uni.showToast({
							title: response.data.message || '预约成功',
							icon: 'success'
						});
						uni.navigateBack({
							delta: 1 // delta 表示返回的页面数，默认为 1，表示返回上一页
						});
					},
					fail: (error) => {
						console.error('请求失败:', error);
						uni.showToast({
							title: error.message || '预约失败',
							icon: 'none',
						});
						console.error(error);
					}
				});
			},

			formReset() {
				this.appointment = {
					user_real_name: '',
					user_mobile_phone: '',
					studentId: '',
					college: '',
					campus: '',
					appointmentDate: '',
					doctorIndex: 0,
					consultIntentionIndex: 0
				};
			},
			onDateChange(e) {
				this.appointment.appointmentDate = e.detail.value;
			},
			onDoctorChange(e) {
				this.appointment.doctorIndex = e.detail.value;
			},
			onConsultIntentionChange(e) {
				this.appointment.consultIntentionIndex = e.detail.value;
			}
		},
		onLoad() {
			// 检查登录状态
			if (!this.userStore.loginStatus) {
				uni.navigateTo({
					url: '/pages/login/login' // 登录页面的路径
				});
				uni.showToast({
					title: '请先登录！',
					icon: 'none',
					duration: 2000
				});
			}
		}
	};
</script>

<style scoped>
	.appointment-form {
		padding: 20px;
	}

	.uni-form-item {
		margin-bottom: 20px;
	}

	.uni-form-item .title {
		padding: 10rpx 0;
	}

	.uni-input,
	.picker {
		border: 1px solid #4ac8bd;
		border-radius: 4px;
		padding: 10rpx;
		width: 100%;
		box-sizing: border-box;
		font-size: 30rpx;
	}

	.uni-btn-v {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: 20px;
	}

	.submit-btn {
		background-color: #4ac8bd;
		color: white;
		border: none;
		border-radius: 4px;
		padding: 10rpx 0;
		width: 100%;
	}

	.reset-btn {
		background-color: transparent;
		color: #4ac8bd;
		border: 1px solid #4ac8bd;
		width: 100%;
	}
</style>