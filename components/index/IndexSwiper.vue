<template>
	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
		<swiper-item v-for="(image, index) in carouselImages" :key="index">
			<image class="swiper-img" :src="image" mode="aspectFill"></image>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		data() {
			return {
				carouselImages: [], // 存储轮播图数据
			};
		},
		created() {
			this.fetchCarouselImages();
		},
		methods: {
			fetchCarouselImages() {
				uni.request({
					url: 'http://localhost:3000/api/getCarousels', // 后端接口
					method: 'GET',
					success: (res) => {
						if (res.data.success && res.data.data) {
							this.carouselImages = res.data.data.map(item => item.images); // 更新轮播图数据
						} else {
							uni.showToast({
								title: '获取轮播图失败',
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
			}
		}
	}
</script>

<style scoped>
	swiper {
		/* 居中 */
		margin: 0 auto;
		width: 90%;
		height: 200rpx;
	}

	.swiper-img {
		width: 100%;
		height: 200rpx;
		border-radius: 20rpx;
	}
</style>