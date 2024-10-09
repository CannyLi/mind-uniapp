<template>
	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
		<swiper-item>
			<view class="swiper-item">
				<image class="swiper-img" src="../../static/images/Swiper/swiper1.jpg" mode=""></image>
			</view>
		</swiper-item>
		<swiper-item>
			<view class="swiper-item">
				<image class="swiper-img" src="../../static/images/Swiper/swiper2.jpg" mode=""></image>
			</view>
		</swiper-item>
		<swiper-item>
			<view class="swiper-item">
				<image class="swiper-img" src="../../static/images/Swiper/swiper3.jpg" mode=""></image>
			</view>
		</swiper-item>
	</swiper>
</template>

<script>
	
</script>

<style scoped>
swiper{
	/* 居中 */
	margin: 0 auto;
	width: 90%;
	height: 200rpx;
}
.swiper-img{
	width: 100%;
	height: 200rpx;
	border-radius: 20rpx;
}
</style>