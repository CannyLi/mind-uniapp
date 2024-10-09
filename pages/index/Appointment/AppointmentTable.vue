<template>
  <view class="appointment-form">
    <form @submit.prevent="submitAppointment">
      <view class="form-item">
        <input type="text" placeholder="预约人姓名" v-model="appointment.name" required />
      </view>
      <view class="form-item">
        <input type="text" placeholder="电话号码" v-model="appointment.phone" required />
      </view>
      <view class="form-item">
        <input type="text" placeholder="学号" v-model="appointment.studentId" required />
      </view>
      <view class="form-item">
        <input type="text" placeholder="学院" v-model="appointment.college" required />
      </view>
      <view class="form-item">
        <input type="text" placeholder="所在校区" v-model="appointment.campus" required />
      </view>
      <view class="form-item">
        <picker mode="date" value="appointment.date" @change="onDateChange">
          <view class="picker">{{ appointment.date || '选择预约时间' }}</view>
        </picker>
      </view>
      <view class="form-item">
        <picker mode="selector" :range="doctors" value="appointment.doctorIndex" @change="onDoctorChange">
          <view class="picker">{{ doctors[appointment.doctorIndex] || '选择预约医师' }}</view>
        </picker>
      </view>
      <view class="form-item">
        <picker mode="selector" :range="consultIntentions" value="appointment.consultIntentionIndex" @change="onConsultIntentionChange">
          <view class="picker">{{ consultIntentions[appointment.consultIntentionIndex] || '咨询意向' }}</view>
        </picker>
      </view>
      <button class="submit-button" type="primary">提交预约</button>
    </form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      appointment: {
        name: '',
        phone: '',
        studentId: '',
        college: '',
        campus: '',
        date: '',
        doctorIndex: 0,
        consultIntentionIndex: 0
      },
      doctors: ['医师A', '医师B', '医师C'],
      consultIntentions: ['心理咨询', '职业规划', '健康咨询']
    };
  },
  methods: {
    submitAppointment() {
      // 这里添加提交预约的逻辑
      console.log('预约信息:', this.appointment);
      uni.showToast({
        title: '预约提交成功',
        icon: 'success',
        duration: 2000
      });
    },
    onDateChange(e) {
      this.appointment.date = e.detail.value;
    },
    onDoctorChange(e) {
      this.appointment.doctorIndex = e.detail.value;
    },
    onConsultIntentionChange(e) {
      this.appointment.consultIntentionIndex = e.detail.value;
    }
  }
};
</script>

<style scoped>
.appointment-form {
  padding: 20px;
}

.form-item {
  margin-bottom: 15px;
}

.form-item input,
.picker {
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 50px;
  width: 100%;
  box-sizing: border-box;
}

.submit-button {
  background-color: #4ac8bd;
  color: white;
  padding: 10px;
  border-radius: 4px;
}
</style>