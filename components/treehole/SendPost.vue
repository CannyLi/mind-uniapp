<template>
	<view class="post-page">
		<view class="user-info">
			<image class="user-avatar"></image>
			<text class="user-name"></text>
		</view>
		<textarea class="post-content" placeholder="说点什么吧..."></textarea>
		<button class="submit-btn">发布</button>
	</view>
</template>

<script>
</script>

<style scoped>
	.post-page {
		padding: 20rpx;
	}

	.user-info {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.user-avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.user-name {
		margin-left: 20rpx;
		font-size: 32rpx;
	}

	.post-content {
		width: 100%;
		height: 200rpx;
		margin-bottom: 20rpx;
		padding: 10rpx;
		font-size: 32rpx;
		border: 1px solid #ccc;
		border-radius: 10rpx;
	}

	.submit-btn {
		width: 100%;
		padding: 20rpx;
		background-color: #4ac8bd;
		color: white;
		font-size: 36rpx;
		text-align: center;
		border-radius: 10rpx;
	}
</style>