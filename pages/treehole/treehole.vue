<template>
  <view class="post-list">
    <view class="post-item">
      <view class="post-header">
        <image class="post-avatar"></image>
        <view class="post-info">
          <text class="post-name"></text>
          <text class="post-time"></text>
        </view>
      </view>
      <view class="post-content"></view>
      <view class="post-actions">
        <view class="post-like">
          点赞
        </view>
        <view class="post-comment" >
          留言
        </view>
      </view>

      <!-- 评论区 -->
      <view class="comment-section">
        <view class="comment-item">
          <text></text>
        </view>
        <input type="text"  placeholder="写评论..." />
        <button>评论</button>
      </view>
    </view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		components:{
			
		},
		methods: {
			
		}
	}
</script>

<style scoped>
.post-list {
  padding: 20rpx;
}
.post-item {
  margin-bottom: 40rpx;
  padding: 20rpx;
  border: 1px solid #ccc;
  border-radius: 10rpx;
}
.post-header {
  display: flex;
  align-items: center;
}
.post-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}
.post-info {
  margin-left: 20rpx;
}
.post-name {
  font-size: 32rpx;
}
.post-time {
  font-size: 28rpx;
  color: #999;
}
.post-content {
  margin-top: 20rpx;
  font-size: 36rpx;
}
.post-actions {
  margin-top: 20rpx;
  display: flex;
  justify-content: space-between;
}
.post-like, .post-comment {
  font-size: 32rpx;
  cursor: pointer;
}
.comment-section {
  margin-top: 20rpx;
  padding: 20rpx;
  border-top: 1px solid #ccc;
}
.comment-item {
  margin-bottom: 10rpx;
}

</style>
