<template>
	<view class="myappointment">
		<view v-if="appointments.length === 0">
			您还没有预约。
		</view>
		<view v-else>
			<view class="appointment-item" v-for="(appointment, index) in appointments"
				:key="appointment.appointment_id">
				<view class="appointment-info">
					<view class="appointment-field">
						<text class="field-label">预约人姓名</text>
						<text class="field-value">{{ appointment.user_real_name }}</text>
					</view>
					<view class="appointment-field">
						<text class="field-label">电话号码</text>
						<text class="field-value">{{ appointment.user_mobile_phone }}</text>
					</view>
					<view class="appointment-field">
						<text class="field-label">学号</text>
						<text class="field-value">{{ appointment.studentId }}</text>
					</view>
					<view class="appointment-field">
						<text class="field-label">学院</text>
						<text class="field-value">{{ appointment.college }}</text>
					</view>
					<view class="appointment-field">
						<text class="field-label">所在校区</text>
						<text class="field-value">{{ appointment.campus }}</text>
					</view>
					<view class="appointment-field">
						<text class="field-label">预约时间</text>
						<text class="field-value">{{ formatDate(appointment.appointmentDate) }}</text>
					</view>
					<view class="appointment-field">
						<text class="field-label">咨询意向</text>
						<text class="field-value">{{ appointment.consultIntention }}</text>
					</view>
				</view>
				<view class="appointment-actions">
					<button class="delete-btn iconfont icon-shanchu" @click="deleteAppointment(appointment.appointment_id)">删除</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		useUserStore
	} from '@/stores/modules/userStore.js';
	import {
		ref,
		onMounted
	} from 'vue';

	export default {
		setup() {
			const userStore = useUserStore();
			// 初始化用户信息
			userStore.initUser();

			const appointments = ref([]);

			// 获取当前用户的预约信息
			const fetchAppointments = async () => {
				try {
					const response = await uni.request({
						url: 'http://localhost:3000/api/appointments/user/' + userStore.userInfo
							.mobile_phone,
						method: 'GET',
					});
					console.log("response.data", response.data);
					if (response.statusCode === 200 && response.data.success === "0") {
						appointments.value = response.data.data;
					} else {
						uni.showToast({
							title: '获取预约信息失败',
							icon: 'none',
						});
					}
				} catch (error) {
					console.error('获取预约信息错误:', error);
					uni.showToast({
						title: '获取预约信息失败，请稍后再试。',
						icon: 'none',
					});
				}
			};

			// 删除预约
			const deleteAppointment = async (appointmentId) => {
				try {
					const response = await uni.request({
						url: `http://localhost:3000/api/appointments/${appointmentId}`,
						method: 'DELETE',
					});

					if (response.statusCode === 200 && response.data.success === "0") {
						appointments.value = appointments.value.filter(apt => apt.appointment_id !==
							appointmentId);
						uni.showToast({
							title: '预约删除成功',
							icon: 'success',
						});
					} else {
						uni.showToast({
							title: '预约删除失败',
							icon: 'none',
						});
					}
				} catch (error) {
					console.error('删除预约信息错误:', error);
					uni.showToast({
						title: '删除预约信息失败，请稍后再试。',
						icon: 'none',
					});
				}
			};

			// 在页面加载时获取预约信息
			onMounted(() => {
				fetchAppointments();
			});

			// 格式化日期yy-mm-dd
			const formatDate = (dateString) => {
				if (!dateString) return '未填写'; // 如果没有日期数据，返回 '未填写'

				const date = new Date(dateString);
				const year = date.getFullYear();
				const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 保证两位数
				const day = date.getDate().toString().padStart(2, '0'); // 保证两位数

				return `${year}-${month}-${day}`;
			};


			return {
				appointments,
				deleteAppointment,
				userStore,
				formatDate,
			};
		},
		onLoad() {
			// 检查登录状态
			if (!this.userStore.loginStatus) {
				uni.navigateTo({
					url: '/pages/login/login', // 登录页面的路径
				});
				uni.showToast({
					title: '请先登录！',
					icon: 'none',
					duration: 2000,
				});
			}
		},
	};
</script>

<style scoped>
	.myappointment {
		padding: 20px;
	}

	.appointment-item {
		margin-bottom: 10px;
		border: none;
		border-radius: 8px;
		background-color: #fff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		padding: 15px;
		display: flex;
		flex-direction: column;
	}

	.appointment-info {
		margin-bottom: 15px;
		display: flex;
		flex-direction: column;
	}

	.appointment-field {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}

	.field-label {
		font-weight: bold;
		color: #333;
		text-align: left;
	}

	.field-value {
		color: #666;
	}

	.appointment-actions {
		display: flex;
		justify-content: flex-end;
	}

	.delete-btn {
		background-color: #4ac8bd;
		color: #f0f0f0;
		border: none;
		font-size: 14px;
		cursor: pointer;
	}

	.delete-btn:hover {
		color: #333;
	}
</style>